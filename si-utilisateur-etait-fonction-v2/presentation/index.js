// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png"),

  discussion: require("../assets/diagrams/discussion.svg"),
  cycle: require("../assets/diagrams/cycle-voix-ouie.svg"),
  cycleChatBot: require("../assets/diagrams/cycle-chatbot.svg"),
  eventstream: require("../assets/diagrams/eventstream.svg"),
  eventstreamDelayed: require("../assets/diagrams/eventstream-delay.svg"),
  nrj: require("../assets/diagrams/nrj.svg"),
  cycleChatBotWithDOM: require("../assets/diagrams/cycle-chatbot-withdom.svg"),
  rick: require("../assets/riQRoll.png"),
  chefProjet: require("../assets/chefProjet.jpg"),
};

const videos = {
  reminder: require("../assets/videos/slack_reminder.mp4"),
}

preloader(images);

const theme = createTheme({
  primary: "#ff4081"
});

const codeOptions = { textSize: '1em' }

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} caps textColor="black">
              Et si l'utilisateur était une fonction ?
            </Heading>
            <Heading size={1} fit caps>
              (introduction à la programmation réactive)
            </Heading>
            <Text margin="1em auto auto">ToulouseJS - Janvier 2017</Text>
            <Text>@pierremartin</Text>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Une conversation
            </Heading>
            <List textColor="white">
              <Appear><ListItem>Alice : Salut Bob !</ListItem></Appear>
              <Appear><ListItem>Alice : Tu vas à ToulouseJS ?</ListItem></Appear>
              <Appear><ListItem>Bob : Bien sûr il y a un truc sur Redux</ListItem></Appear>
              <Appear><ListItem>Alice : Ah super on se verra là-bas alors</ListItem></Appear>
              <Appear><ListItem>Bob : kthxbye !</ListItem></Appear>
            </List>
            <Appear textColor="white">
              <Image width="100%" src={images.discussion}/>
            </Appear>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
              <Heading size={2} textColor="primary" textFont="primary">
                Interfaces
              </Heading>
              <Image width="100%" src={images.cycle}/>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
              <Heading size={2} textColor="primary" textFont="primary">
                Interfaces
              </Heading>
              <Image width="100%" src={images.cycleChatBot}/>
              <Text fit size={2} style={{color: 'white'}}>
                <Appear><span>... l'information circule selon un "cycle"</span></Appear>
                <Appear><span> symétrique</span></Appear>
                <Appear><span>, asynchrone</span></Appear>
                <Appear><span> et est transformée</span></Appear>
              </Text>
              <Text fill style={{color: 'white'}}>
                <Appear><code>Réponse = ChatBob(Requête)</code></Appear><br/>
                <Appear><code>Clavier = Alice(Écran)</code></Appear>
              </Text>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} textColor="primary" textFont="primary">
              Analysons cette UI
            </Heading>
            <p>
              <video src={videos.reminder} controls></video>
            </p>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw!../assets/utilisateur-fonction.example")}
            ranges={[
              { loc: [0, 4], note: "Si l'utilisateur était une fonction ?" },
              { loc: [5, 9] },
              { loc: [5, 9], note: "DOMEvents ? [DOMEvent, DOMEvent, DOMEvent] ?" },
            ]}/>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={2} caps fit>
              Et si l'utilisateur était une fonction ?
            </Heading>
            <Text fill textColor="white">
              <Image width="100%" src={images.discussion}/>
              Notion de temps (asynchrone)
            </Text>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} textColor="primary" textFont="primary">
              Flux d'évènements
            </Heading>
            <br />
            <Appear>
              <div>
                <Text textColor="white">
                  Tableaux (espace)
                </Text>
                <CodePane
                  {...codeOptions}
                  lang="js"
                  source={
`[2, 4, 6]
	.filter(x => x < 5) // [2, 4]
	.map(x => x * 2) // [4, 8]
`} />
              </div>
            </Appear>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} textColor="primary" textFont="primary">
              Flux d'évènements
            </Heading>
            <Image src={images.eventstream}/>
          </Slide>
          <Slide transition={["none"]} bgColor="black">
            <Heading size={2} textColor="primary" textFont="primary">
              Flux d'évènements
            </Heading>
            <Image fit src={images.eventstreamDelayed}/>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} textColor="primary" textFont="primary">
              Flux d'évènements
            </Heading>
            <Image fit src={images.nrj}/>
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={2} caps fit>
              Il faut qu'on parle ...
            </Heading>
            <Image src={images.chefProjet} width="100%" />
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <iframe
              width="100%"
              height="400px"
              src="https://docs.google.com/spreadsheets/d/12AFTXNjB0t0UIKfgCItDW78rOOeuS1RciwRMRcbLinc/edit?usp=sharing&widget=true&headers=false"></iframe>
            <Appear>
              <Text fill textColor="white">
                Mais vous, vous avez la puissance du web avec vous !
                <br /><strong>Websockets, Ajax, Bases de données, (DOM)Events...</strong>
              </Text>
            </Appear>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw!../assets/flux.example")}
            ranges={[
              { loc: [0, 5], title: "Un calcul basique" },
              { loc: [13, 14] },
              { loc: [14, 15] },
              { loc: [15, 16], title: "Calcul à chaque nouvelle valeur" },
              { loc: [13, 17], note: "... peu importe d'où viennent a$, b$ et c$ et quand la valeur est disponible"},
            ]}/>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={2} caps fill>
              Et si l'utilisateur était une fonction ?
            </Heading>

            <Heading size={2} margin={'1em 0 0 0'} caps fit textColor="white">
              Convention : <code>foo$</code> = EventStream / Observable
            </Heading>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw!../assets/utilisateur-fonction.example")}
            ranges={[
              { loc: [5, 9], note: "DOMEvents ? [DOMEvent, DOMEvent, DOMEvent] ?" },
              { loc: [13, 17] },
              { loc: [18, 22] },
              { loc: [23, 33] },
            ]}/>

          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit caps>
              Yapluka coder l'UI !
            </Heading>
            <Heading size={1} textColor="black">
              par symétrie
            </Heading>
            <br />
            <Appear>
              <CodePane
                {...codeOptions}
                lang="js"
                source={
`function User(DOM$) {
	/* ??? */
	return DOMEvent$;
}
`} />
            </Appear>
            <Appear>
              <CodePane
                {...codeOptions}
                lang="js"
                source={
`function Chat(DOMEvent$) {
	/* ??? */
	return DOM$;
}
`} />
            </Appear>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
              <Heading size={2} textColor="primary" textFont="primary">
                En résumé
              </Heading>
              <Image width="100%" src={images.cycleChatBotWithDOM}/>
          </Slide>

          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw!../assets/chatbob.example")}
            ranges={[
              { loc: [6, 7],
                title: "Créons notre premier Observable RxJS",
                note: "Il représentera les messages envoyés par l'utilisateur" },
              { loc: [6, 8], title: "Voici le lien avec le DOM" },
              { loc: [6, 14], note: "À chaque soumission nous récupérons la valeur \"métier\" qui nous intéresse" },
              { loc: [14, 19] },
              { loc: [71, 73], title: "Les messages affichés dans le chat en dépendent"},
              { loc: [77, 93], note: "On transforme chaque message en DOMElement"},
              { loc: [93, 98]},
              { loc: [99, 109] },
              { loc: [22, 23],
                title: "Passons à la partie intéressante !",
                note: "... en récupérant tout d'abord les commandes de rappel" },
              { loc: [22, 26] },
              { loc: [31, 40], note: "... avec des informations métier" },
              { loc: [28, 31], note: "... ou une erreur" },
              { loc: [42, 43], title: "Créons maintenant les réponses de Bob !" },
              { loc: [43, 44], title: "Une commande = plusieurs réponses" },
              { loc: [44, 50], note: "Une confirmation" },
              { loc: [50, 57], note: "Le rappel en lui-même"},
              { loc: [50, 58], note: "...au bon moment" },
              { loc: [59, 65], note: "Un feedback en cas d'erreur" },
              { loc: [65, 70], note: "Le contenu de tous ces messages est enrichi uniformément" },
              { loc: [71, 75], note: "... et affiché comme les autres" },
            ]}/>

          <Slide>
            <iframe height='650' scrolling='no' title='QdgMwJ'
              src='//codepen.io/real34/embed/QdgMwJ/?height=505&theme-id=0&default-tab=result&embed-version=2'
              frameBorder='no'
              allowTransparency='true'
              allowFullScreen='true'
              style={{width: '100%'}}>
            </iframe>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
              <Heading size={2} textColor="primary" textFont="primary">
                Oui, mais là c'était un peu dégueulasse !
              </Heading>
              <p>
                <Image src="http://i.giphy.com/tjwzClJM6fyEw.gif" />
              </p>
          </Slide>

          <Slide transition={["slide"]} bgColor="black">
              <CodePane
                textSize="0.85em"
                margin="-3em 0 0 0"
                lang="js"
                source={require("raw!../assets/cycle-counter.example")}
                />
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
              <Heading size={2} textColor="white" textFont="primary">
                Beer O'clock!
              </Heading>
              <Link href="http://real34.github.io/slides">
                real34.github.io/slides
              </Link>
              <p>
                <Image src={images.rick} />
              </p>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
