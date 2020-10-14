class: center, middle

# Implementing routing with GraphQL using interfaces

### Pierre MARTIN <small>([@pierremartin](https://twitter.com/pierremartin))</small>

![](logo-front-commerce.svg)

<small>Reacticon 3.0 — 2020-10-14</small>

---

# Agenda

1. `whoami`
2. Routing in Front-Commerce
3. The problem
4. Our solution
5. Something about hammer and nails

---

background-image: url(toulouse.png)

# `whoami`

---

background-image: url(flash.png)
background-size: contain

---

# Then I did a lot of PHP.

--

```
pear install MDB2
pear install pear/MDB2#mysql
```

```php
require_once "MDB2.php";

$db   = new MDB2();
$dsn  = "mysql://chessuser:localpass@localhost/chess";
$mdb2 = MDB2::factory($dsn);
$mdb2->setFetchMode(MDB2_FETCHMODE_ASSOC);

$sql= 'SELECT * FROM `chess_users`';
$data = $mdb2->queryAll($sql);
print_r($data);
```

---

# And ended up programming for a living.

--

- **2009**: CakePHP expert @CakeDC

- **2011**: co-owner @Occitech

  - CakePHP, Magento (1.5+), Mootools/Backbone/Angular/Ember/React

  - **2015**: PoC of using Magento2's REST API with React

  - **2016**: first client on-board

  - **2018**: first projects live… _<small>a few weeks before Reacticon 1.0</small>_

  - **2019**: teams splitted internally, first partner agencies

- **2020**: CTO & co-founder @Front-Commerce

---

.center[![Front-Commerce](logo-front-commerce.svg)]

## So much Wow.

--

- Stack: React, Sass, Node.js, GraphQL middleware

--

- Used in production with: Magento 1, Magento 2, Wordpress

--

- Next in production: Prismic, OroCommerce

--

- You're not alone!
  - Close relationship with partners
  - Customer Driven roadmap (platform, features…)
  - Professional services: training, expertise, support

--

- **NEW** Front-Commerce Cloud

---

## 2020

- **Rebranding!**

--

- **2.0**: new **routing**, responsive images, advanced caching strategies, **4 years of deprecations removed!**
- **2.1**: new payment methods, utilities for Magento configurations usage, MSI support, Magento admin detection
- **2.2**: Wordpress improvements, new Magento 1 features (guest checkout, bundle & virtual products, credit memo), Magento optional regions config support
- **2.3**: full Magento2 Adyen module support in checkout, new Magento 2 features (login as customer, bundle products, optional zip codes), performance improvements, improved New Relic and Apollo Studio integrations

--

- **Next** (2.4): more Magento2 features (guest checkout, customer reviews, wishlist improvements 2.4.1 support), **and … 🥁**

---

<video width="800" height="600" autoplay loop controls>
    <source src="chocolatine.mp4" type="video/mp4">
</video>

---

## We ❤️ you!

Stay tuned for more product announcements in the next few months.

--

It would be sad to accelerate alone…

- senior developers (we're hiring remotely!)
- investors
- … and of course new partners!

➡️ [pierre@front-commerce.com](mailto:pierre@front-commerce.com)

---

layout:false
background-image: url(devialet.png)
background-size: contain

--
background-image: url(devialet-stores.png)
background-size: contain

---

layout:true

# Routing in Front-Commerce

---

background-image: url(routes.jpg)
background-size: cover

---

## File-based

Inspired by solutions like Next.js, Gatsby, Nuxt, **Sapper**, etc

--

| URL               | Route file                        |
| ----------------- | --------------------------------- |
| **`/my-page`**    | `web/theme/routes/my-page.js`     |
| **`/blog`**       | `web/theme/routes/blog/index.js`  |
| **`/blog/:slug`** | `web/theme/routes/blog/[slug].js` |
| **`/id-:id`**     | `web/theme/routes/id-[id].js`     |

--
**`/archives/:year/:month`**

Advanced patterns possible (regexes etc…) using `front-commerce-prepare.js` `onCreateRoute` hook. Support for layouts, errors …

---

## With automatic preloading

The `preload` method of the route component allows **prefetching on User intent**.

---

<div class="center">
  <video width="560" height="420" autoplay loop>
      <source src="preload.mp4" type="video/mp4">
  </video>
</div>

---

## You said PWA?

Data needs to be fetched in an efficient way.

**Goal: 1 GraphQL request** (+ 1 JS chunk)

---

layout: true

# The problem

---

background-image: url(problem.jpg)
background-size: cover

---

`/foo-bar` could be:

--

- a Category (Magento)

--

- a Product (Magento)

--

- a CMS Page (Magento … or Wordpress)

---

```js
// web/theme/routes/[urlKey].js
import React from "react";

const Dispatcher = (props) => {
  // ????
  return <div>URL key: {props.match.params.urlKey}</div>;
};

export default Dispatcher;
```

.center[**How to fetch data in an efficient way and render the correct component?**]

---

## Solution 1

Use a different URL pattern:

- `/categories/:slug`
- `/products/:slug`

--

**Problem:** not SEO friendly (existing URLs)

The tool should not get in the way!

---

## Solution 2

1. fetch the Entity / ID from the URL
2. specific GraphQL queries depending on the entity type

**Problem:** 2 HTTP calls in cascade

---

layout: true

# Our solution

---

background-image: url(solution.jpg)
background-size: cover

---

One GraphQL query.

- converts an URL to an entity, with its correct type.
- leverage resolvers to get entity data
- leverage fragments for entity specific frontend components

--

Cacheable, 1 HTTP call, open for extension and easy to read

---

layout:false

```graphql
#import "theme/pages/Product/ProductFragment.gql"
#import "theme/pages/Category/CategoryFragment.gql"
#import "theme/pages/CmsPage/CmsPageFragment.gql"

query MatchUrls($url: String!) {
  route(url: $url) {
    path
    __typename # <-- used for the component factory
    ... on RedirectEntity {
      redirectTo
      redirectType
    }
    ... on Product {
      ...ProductFragment
    }
    ... on Category {
      ...CategoryFragment
    }
    ... on CmsPage {
      ...CmsPageFragment
    }
  }
}
```

New entity types easily supported with an override.

---

layout:true

# GraphQL type definitions

---

```graphql
extend type Query {
  route(url: String!): Routable
}

interface Routable {
  path: String
}
```

--

```graphql
type NotFoundEntity implements Routable {
  path: String
}

type RedirectEntity implements Routable {
  path: String
  redirectTo: String
  redirectType: Int
}
```

---

## Modules can define their own types

```diff
-type Product {
+type Product implements Routable {
+ path: String
  sku: ID
}
```

```diff
-type CMSPage {
+type CMSPage implements Routable {
+ path: String
  content: Wysiwyg
}
```

…

---

layout:true

# Resolvers

---

## Find entity from URL

Platform specific.

```js
loaders.Page.registerUrlMatcher(redirectStaticCatalogUrls({ Url }));

loaders.Page.registerUrlMatcher(
  loadEntitiesFromUrlRewrites({
    Url,
    Product: loaders.Product,
    Category: loaders.Category,
    CmsPages: loaders.CmsPages,
  })
);
```

---

## Fetch entity data

Let's consider simple URLs for now: `/category/:id`, `/product/:sku`…

--

```js
loaders.Page.registerUrlMatcher(productUrlMatcher({ Product }));
```

---

```js
import pathToRegexp from "path-to-regexp";

export const productUrlMatcher = ({ Product }) => (url) => {
  const productUrlRegexp = pathToRegexp("/product/:sku");
  const match = productUrlRegexp.exec(url);
  if (!match) {
    return;
  }

  const sku = match[1];
  if (sku) {
    return Product.load(sku).then((product) => {
      if (product) {
        return {
          ...product,
          __typename: "Product", // <-- implements the `Routable` interface
        };
      }
    });
  }
};
```

---

## … a type for every situation

- Redirections: a redirect is a data type!
- Errors: a page not found is a data type!
- …

---

## Advanced concerns

We can discuss it later if you want.

- many different services: how to find the entity efficiently?
- same urls for different entities?
- homogeneous entities from different services? (`CmsPage`)
- localization?
- …

**Power users:** chaining URL matchers brings you superpowers

---

layout: true

# Map content to components

---

```graphql
#import "theme/pages/Product/ProductFragment.gql"
#import "theme/pages/Category/CategoryFragment.gql"
#import "theme/pages/CmsPage/CmsPageFragment.gql"

query MatchUrls($url: String!) {
  route(url: $url) {
    path
    __typename # <-- used for the component factory
    # [...]
  }
}
```

---

Modules can register a component for a given type.

```js
//` my-module/web/moduleRoutes.js`
import React from "react";
import MyCustomPage from "theme/pages/MyCustomPage";

export const dispatchedRoutes = {
  myPageType: (props) => <MyCustomPage id={props.matched.identifier} />,
};
```

---

```js
import React from "react";
import { Category, Product, CmsPage } from "web/LoadableRoutes";

export const dispatchedRoutes = {
  Product: (props) => (
    <Product
      sku={String(props.matched.identifier)}
      product={props.matched}
      loading={props.loading}
      location={props.location}
    />
  ),
  CmsPage: (props) => (
    <CmsPage
      id={String(props.matched.identifier)}
      cms={props.matched}
      loading={props.loading}
    />
  ),
  // […]
};
```

---

layout: true

# Hammer & nails?

---

This pattern can easily be reused for other similar problems.

- Sitemap
- Shipping tracking information
- Payment details
- … Products?

---

```js
import makePolymorphicGraphQLTypeLoader from "server/core/graphql/makePolymorphicGraphQLTypeLoader";
export default {
  namespace: "Front-Commerce/Core",
  contextEnhancer: ({ req }) => {
    return {
      Page: PageLoader(
        makePolymorphicGraphQLTypeLoader({
          name: "Page",
          defaultTypename: "NotFoundEntity",
        })
      ),
      Sitemap: SitemapLoader(
        makePolymorphicGraphQLTypeLoader({
          name: "Sitemap",
          defaultTypename: "SitemapCustom",
        })
      ),
    };
  },
};
```

---

layout:false
background-image: url(alarm.jpg)
background-size: cover

# Thanks for your time!

**Slides will be published online soon™.**

I'll send the url in Slack, and tweet it (@pierremartin).

---

# Photo credits

Photo by <a href="https://burst.shopify.com/@sarahpflugphoto?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+White+Alarm+Clock&amp;utm_medium=referral&amp;utm_source=credit">Sarah Pflug</a> from <a href="https://burst.shopify.com/time?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+White+Alarm+Clock&amp;utm_medium=referral&amp;utm_source=credit">Burst</a>

[Unsplash](https://unsplash.com/)
