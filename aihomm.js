function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const { useRef, useState, useEffect, style, Fragment, forwardRef, Component, createRef } = React;

const onloadAnimation = controls => {
  const tl = gsap.timeline();
  tl.fromTo(
  ".slide-number-container",
  { x: "3%" },
  { opacity: 1, x: 0, duration: 0.32 },
  "in+=0.56").

  fromTo(".slide-title", { y: "200%" }, { y: 0, duration: 0.64 }, "in").
  to(".slide-info-container", { opacity: 1 }, "in+=0.64")
  // info box
  .to(
  ".slide-info-box",
  { "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
  "in+=0.64").

  to(".slide-info-box a", { opacity: 1 }, "in+=0.82").
  to(".slide-info-box h4", { opacity: 1 }, "in+=0.82")
  // controls -
  .to(controls, { opacity: 1, duration: 0.32 }, "in+=0.64");
};

// ANIMATE SLIDE
const animateSlide = (
titleWrap,
numberWrap,
setSlidingState,
wrapTransform) =>
{
  const tl = gsap.timeline();
  // hide title clip
  tl.to(
  ".slide-title",
  { "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)", duration: 0.32 },
  "in").

  to(
  titleWrap,
  { y: wrapTransform, duration: 0.44, ease: "power2" },
  "in+=0.32")

  // animate the number container
  .to(
  numberWrap,
  { y: wrapTransform, duration: 0.4, ease: "power2" },
  "in+=0.32")

  // animate the number
  .to(".slide-number", { opacity: 0, duration: 0.32 }, "in")
  // reset the number animation
  .set(".slide-number", { opacity: 1 }, "in+=0.32")
  // show title clip
  .to(".slide-title", {
    "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    duration: 0.64 })

  // animate slide info text container
  .to(
  ".slide-info",
  { y: wrapTransform, duration: 0.32, ease: "power2" },
  "in+=0.32")

  // animate info text
  .to(".slide-info", { opacity: 0, duration: 0.32 }, "in").
  to(".slide-info", { opacity: 1, duration: 0.32 }, "in+=0.32").
  add(setSlidingState, 1.1);
};

// ANIMATE SLIDER WHEN EXPAND BUTTON IS CLICKED
const animateSliderOut = () => {
  const tl = gsap.timeline({ onComplete: () => {} });
  tl.to(
  ".slide-title",
  {
    "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    duration: 0.4 },

  "out").

  to(
  ".slide-number",
  {
    y: "+=100%" },

  "out").

  fromTo(
  ".slide-number",
  {
    "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },

  {
    "clip-path": "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)",
    duration: 0.08 },

  "out").

  to(
  ".slide-info-box",
  {
    opacity: 0 },

  "out");

};

// ANIMATE OVERLAY WHEN EXPAND BUTTON IS CLICKED
const animateOverlayIn = (overlay, navbar, setExpandingState) => {
  const tl = gsap.timeline({ delay: 0.4, onComplete: () => {} });
  tl
  // navbar
  .to(
  navbar,
  {
    y: "-100%" },

  "in")

  // overlay
  .to(
  overlay,
  {
    autoAlpha: 1 },

  "in+=0.08").

  fromTo(
  ".overlay-nav-heading",
  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },

  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.48,
    ease: "power1.inOut" },

  "in").

  fromTo(
  ".overlay-nav-buttons",
  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },

  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.48,
    ease: "power1.inOut" },

  "in")

  // slides
  .fromTo(
  ".overlay-slide-preview",
  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },

  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    stagger: 0.32,
    duration: 0.8,
    ease: "expo.inOut" },

  "in+=0.1").

  fromTo(
  ".overlay-preview-title-text",
  {
    "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },

  {
    "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    stagger: 0.32,
    duration: 0.56,
    ease: "sine" },

  "in+=0.48").

  fromTo(
  ".overlay-preview-title-number",
  {
    opacity: 0 },

  {
    opacity: 1,
    stagger: 0.32,
    duration: 0.48 },

  "in+=0.48").

  add(setExpandingState, 1);
};

// ANIMATE THE OVERLAY WHEN CLOSE BUTTON IS CLICKED
const animateOverlayOut = (overlay, navbar, callback) => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlay, { visibility: "hidden" });
    } });

  tl.to(
  ".slide-title",
  {
    "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    duration: 0.64 },

  "in+=0.32").

  to(".slide-info-box", { opacity: 1 }, "in+=0.32").
  to(
  ".slide-number",
  {
    "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    y: "-=100%" },

  "in+=0.32").

  to(overlay, { opacity: 0 }, "in").
  to(navbar, { y: 0, duration: 0.64 }, "in").
  add(callback, 0.96);
};
// ANIMATE THE OVERLAY AND THE SLIDER WHEN OVERLAY IMAGE IS CLICKED
const animateImg = (overlay, callback, navbar) => {
  const tl = gsap.timeline({
    defaults: { duration: 0.4 },
    onComplete: () => {
      gsap.set(".overlay-preview-wrap", { clearProps: "width,x,padding" });
      gsap.set(".overlay-slide-preview", { clearProps: "margin,width,height" });
      gsap.set(".overlay-slide-container", {
        clearProps: "padding-left,height,overflow,width" });

      gsap.set(".overlay-slide-container", {
        clearProps: "height,overflow,width" });

      gsap.set(".overlay-preview-title-text", { clearProps: "clip-path,y" });
      gsap.set(".overlay-preview-title-number", { clearProps: "opacity" });
    } });

  tl
  // Overlay components
  .set(".overlay-slide-container", { width: "100%" }, "animate").
  to(
  ".overlay-slide-container",
  { height: "100%", overflow: "hidden", width: "100%" },
  "animate").

  to(
  ".overlay-slide-preview",
  { margin: "0", width: "100vw", height: "100vh" },
  "animate")

  // hide overlay image text
  .to(
  ".overlay-preview-title-text",
  {
    "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 0.24 },

  "animate").

  to(
  ".overlay-preview-title-number",
  { opacity: 0, duration: 0.24 },
  "animate").

  to(
  overlay,
  {
    opacity: 0,
    onComplete: () => {
      gsap.set(overlay, { visibility: "hidden" });
    } },

  "animate+=0.32").

  add(callback, 0.72)
  // Animating the slider components
  .fromTo(
  ".slide-title",
  { "clip-path": "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
  { "clip-path": "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)", duration: 0.64 },
  0.48).

  fromTo(
  ".slide-number",
  { "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
  {
    "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    y: "-=100%" },

  0.48)

  // show slider info box
  .to(".slide-info-box", { opacity: 1 }, 0.48)
  // animating the navbar
  .to(navbar, { y: 0 }, 0.4);
};

const animatePreview = (x, slideCount, numberTransform) => {
  const tl = gsap.timeline({ defaults: { duration: 0.4 } });
  tl
  // overlay
  .to(".overlay-preview-wrap", { "padding-left": "0px", x: x, width: "400%" })
  // slider
  .set(".slider-container", {
    background: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/${slideCount}.jpg') center center / cover` }).
                    
  set(".number-wrap", { y: numberTransform }).
  set(".title-wrap", { y: numberTransform }).
  set(".slide-info", { y: numberTransform });
};

const SlidePreview = forwardRef((props, ref) => {
  return (
    React.createElement("div", {
      className: "overlay-slide-preview",
      style: props.styles,
      onClick: props.click,
      ref: ref,
      id: props.id },

    React.createElement("h4", { className: "overlay-preview-title" },
    React.createElement("span", { className: "overlay-preview-title-number" }, props.number),
    React.createElement("span", { className: "overlay-preview-title-text" }, props.category))));



});

const Toggle = () => {
  const getTheme = string => {
    return window.localStorage.getItem("theme") === string;
  };
  const setTheme = () => {
    if (getTheme("dark")) {
      gsap.set(":root", {
        "--bg-color": "#211f1f",
        "--text-color-alt": "#FFF",
        duration: 0.32 });

      // set toggle position depending on theme state
      gsap.set(".theme-toggle span", { x: 12 });
    } else {
      window.localStorage.setItem("theme", "light");
    }
  };
  const toggleTheme = () => {
    if (getTheme("") || getTheme("light")) {
      gsap.to(":root", {
        "--bg-color": "#211f1f",
        "--text-color-alt": "#FFF",
        duration: 0.32 });

      gsap.to(".theme-toggle span", { x: 12, duration: 0.24 });
      window.localStorage.setItem("theme", "dark");
    } else {
      gsap.to(":root", {
        "--bg-color": "#FFF",
        "--text-color-alt": "#000",
        "--grey": "#808080" });

      gsap.to(".theme-toggle span", { x: 0, duration: 0.24 });
      window.localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    getTheme();
    setTheme();
  });

  return (
    React.createElement("button", {
      role: "switch",
      "aria-checked": "true",
      className: "theme-toggle",
      onClick: toggleTheme },

    React.createElement("span", null)));


};

const Overlay = forwardRef((props, ref) => {
  const [images] = useState([
  { id: "1", category: "Мечты.", number: "01." },
  { id: "2", category: "Энергия.", number: "02." },
  { id: "3", category: "Идеи.", number: "03." },
  { id: "4", category: "Жизнь.", number: "04." }]);


  const slideRef = useRef([]);

  useEffect(() => {
    // Enable dragging
    new Draggable(".overlay-preview-wrap", {
      type: "x",
      bounds: ".overlay-slide-container",
      dragResistance: 0.55,
      inertia: true,
      throwResistance: 3500,
      onDrag: () => {
        gsap.set(".overlay-slide-preview", { cursor: "grab" });
      },
      onDragEnd: () => {
        gsap.set(".overlay-slide-preview", { cursor: "pointer" });
      } });

  }, []);

  const slides = images.map(item => {
    return (
      React.createElement(SlidePreview, {
        key: item.id,
        styles: {
          background: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/${item.id}.jpg) center center / cover` },

        id: `preview-${item.id}`,
        click: props.imgClick,
        number: item.number,
        category: item.category,
        ref: slide => slideRef.current[item] = slide }));


  });

  return (
    React.createElement(Fragment, null,
    React.createElement("div", { ref: ref, className: "overlay" },
    React.createElement("div", { className: "overlay-bg" }),
    React.createElement("div", { className: "overlay-navigation" },
    React.createElement("div", { className: "overlay-nav-heading" },
    React.createElement("h3", { className: "overlay-title" }, "Выбери свою тему" /*"Select your purpose"*/),
    React.createElement("h4", { className: "overlay-sub" }, "Ты можешь перетащить и щелкнуть, чтобы выбрать" /*"You can drag and click to select"*/)),

    React.createElement("nav", { className: "overlay-nav-buttons" },
    React.createElement(Toggle, null),
    React.createElement("button", { className: "overlay-close", onClick: props.close }, "Тема" /*"Close"*/))),




    React.createElement("div", { className: "overlay-slide-container" },
    React.createElement("div", { className: "overlay-preview-wrap" }, slides)))));




});

const Preloader = forwardRef((props, ref) => {
  const boxRef = useRef();
  const box2Ref = useRef();
  const textRef = useRef();
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
    tl.to(textRef.current, { opacity: 0, duration: 0.4 }, "o").
    to(
    boxRef.current,
    {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.4 },

    "o").

    to(boxRef.current, {
      "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      duration: 0.4 }).

    to(textRef.current, { opacity: 1, duration: 0.4 }, "n").
    to(
    box2Ref.current,
    {
      "clip-path": "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 0.4 },

    "n").

    to(
    box2Ref.current,
    {
      "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration: 0.4 },

    "m");

  }, []);
  return (
    React.createElement("div", { className: "preloader", ref: ref },
    React.createElement("div", { className: "box" },
    React.createElement("p", { ref: textRef }, "Загрузка..."),
    React.createElement("div", { className: "box-clip", ref: boxRef }),
    React.createElement("div", { className: "box-clip2", ref: box2Ref }))));



});

const Navbar = forwardRef((props, ref) => {

  useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    if (theme === "light") {
      ref.current.dataset.theme = 'light';
    }
    if (theme === "dark") {
      ref.current.dataset.theme = "dark";
    }
  });
  const toggleNav = () => {
    ref.current.dataset.expanded === "false" ? ref.current.dataset.expanded = 'true' : ref.current.dataset.expanded = 'false';
    ref.current.dataset.expanded === "true" ? gsap.fromTo(ref.current, { height: "40px" }, { height: "100%", duration: 0.40 }) : gsap.to(ref.current, { height: "40px", duration: 0.40 });
  };
  return (
    React.createElement("header", null,
    React.createElement("nav", { className: "navbar", ref: ref, "data-test": "component-navbar", "data-theme": "light", "data-expanded": "false" },
    React.createElement("button", { className: "navbar-toggle", type: "button", "aria-expanded": "false", "aria-label": "Toggle navigation", onClick: toggleNav },
    React.createElement("span", { className: "toggle-bar" }),
    React.createElement("span", { className: "toggle-bar" }),
    React.createElement("span", { className: "toggle-bar" })),

    React.createElement("div", { className: "brand" },
    React.createElement("a", { href: "" }, "aihomm")),

    React.createElement("div", { className: "nav-center" },
    React.createElement("ul", null,
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: "#" }, "Главная" /*"Home"*/)),
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: "#" }, "Поиск фото" /*"Nature"*/)),
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: "#" }, "Поиск экспертов" /*"Offices"*/)),
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: "#" }, "Магазин" /*"Extension"*/)),
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: "#" }, "Статьи" /*"Custom"*/)),
    React.createElement("li", null, React.createElement("a", { className: "nav-item", href: 'notpage.html' }, "О нас" /*"About"*/)))),


    React.createElement("div", { className: "nav-right" },
    React.createElement("a", { className: "nav-item", href: "singn.html" }, "Войти" /*"Contact"*/)))));




});



const SliderControls = forwardRef((props, ref) => {
  return (
    React.createElement("div", { className: "slider-controls", ref: ref },
    React.createElement("button", { className: "slide-prev-btn", onClick: props.prev }),
    React.createElement("button", { className: "slide-next-btn", onClick: props.next }),
    React.createElement("button", { onClick: props.expand, className: "slide-overlay-btn" })));


});

class App extends Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      slides: [
      {
        id: "1",
        title: "Твои мечты.", /*title: "Back to nature.",*/
        slideNumber: "01",
        text: "Discover nature.",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/1.jpg" },

      {
        id: "2",
        title: "Твоя энергия.", /*title: "Chill in the office.",*/
        slideNumber: "02",
        text: "Step into your office.",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/2.jpg" },

      {
        id: "3",
        title: "Твои идеи.",  /*title: "From dreams to reality.",*/
        slideNumber: "03",
        text: "Go big or go home.",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/3.jpg" },

      {
        id: "4",
        title: "Твоя жизнь.", /*title: "Make a wish.",*/
        slideNumber: "04",
        text: "Push it to the limit.",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/4.jpg" }], 


      isExpanded: false,
      slideCount: 1,
      isSliding: false,
      isExpanding: false,
      isShrinking: false,
      imgsLoaded: 0,
      isLoaded: false });_defineProperty(this, "titleWrapRef",


    createRef());_defineProperty(this, "numberWrapRef",
    createRef());_defineProperty(this, "navbar",
    createRef());_defineProperty(this, "overlay",
    createRef());_defineProperty(this, "sliderContainer",
    createRef());_defineProperty(this, "controlsRef",
    createRef());_defineProperty(this, "preloaderRef",
    createRef());_defineProperty(this, "imageRef",
    createRef());_defineProperty(this, "loadImages",

    () => {
      this.setState(prevState => ({
        imgsLoaded: prevState.imgsLoaded + 1 }));

      if (this.state.imgsLoaded === 3) {
        gsap.to(this.preloaderRef.current, {
          y: "-100%",
          duration: 1,
          onStart: () => {
            // Animate the different elements in
            onloadAnimation(this.controlsRef.current);
          },
          onComplete: () => {
            gsap.set(this.preloaderRef.current, { display: "none" });
            this.setState({ isLoaded: true });
          } });

      }
    });_defineProperty(this, "expand",
    () => {
      // Expand Overlay
      if (
      !this.state.isExpanded &&
      !this.state.isExpanding &&
      !this.state.isSliding)
      {
        this.setState({ isExpanding: !this.state.isExpanding }, () => {
          animateSliderOut();
          animateOverlayIn(this.overlay.current, this.navbar.current, () => {
            this.setState({ isExpanding: false, isExpanded: true });
          });
        });
      }
      // Hide Overlay
      if (
      this.state.isExpanded &&
      !this.state.isExpanding &&
      !this.state.isSliding)
      {
        this.setState({ isExpanding: !this.state.isExpanding }, () => {
          animateOverlayOut(this.overlay.current, this.navbar.current, () => {
            this.setState({ isExpanding: false, isExpanded: false });
          });
        });
      }
    });_defineProperty(this, "prevSlide",
    () => {
      if (this.state.slideCount >= 2 && !this.state.isSliding) {
        this.setState(
        prevState => ({
          slideCount: prevState.slideCount - 1,
          isSliding: true }),

        () => {
          gsap.set(this.sliderContainer.current, {
            background: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/${this.state.slideCount}.jpg) center center / cover` });

          animateSlide(
          this.titleWrapRef.current,
          this.numberWrapRef.current,
          () => this.setState({ isSliding: false }),
          "+=100%");

        });

      }
    });_defineProperty(this, "nextSlide",
    () => {
      if (this.state.slideCount <= 3 && !this.state.isSliding) {
        this.setState(
        prevState => ({
          slideCount: prevState.slideCount + 1,
          isSliding: true }),

        () => {
          gsap.set(this.sliderContainer.current, {
            background: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/${this.state.slideCount}.jpg) center center / cover` });

          animateSlide(
          this.titleWrapRef.current,
          this.numberWrapRef.current,
          () => this.setState({ isSliding: false }),
          "-=100%");

        });

      }
    });_defineProperty(this, "animateImgClick",
    e => {
      if (!this.state.isShrinking) {
        this.setState({ isShrinking: true }, () =>
        animateImg(
        this.overlay.current,
        () =>
        this.setState({
          isExpanded: !this.state.isExpanded,
          isShrinking: false }),

        this.navbar.current));


        // Updating the sliders position based on what image was clicked in the overlay
        if (e.currentTarget.id === "preview-1") {
          this.setState({ slideCount: 1 }, () => animatePreview(0, 1, "0%"));
        }
        if (e.currentTarget.id === "preview-2") {
          this.setState({ slideCount: 2 }, () =>
          animatePreview("-25%", 2, "-100%"));

        }
        if (e.currentTarget.id === "preview-3") {
          this.setState({ slideCount: 3 }, () =>
          animatePreview("-50%", 3, "-200%"));

        }
        if (e.currentTarget.id === "preview-4") {
          this.setState({ slideCount: 4 }, () =>
          animatePreview("-75%", 4, "-300%"));

        }
      }
    });}
  render() {
    const slideNumbers = this.state.slides.map(item => {
      return (
        React.createElement("span", { className: "slide-number", key: item.id },
        item.slideNumber));


    });
    const slideTitles = this.state.slides.map(item => {
      return (
        React.createElement("h1", { className: "slide-title", key: item.id },
        item.title));


    });
    const slideText = this.state.slides.map(item => {
      return (
        React.createElement("h3", { className: "slide-info", key: item.id },
        item.text));


    });
    const images = this.state.slides.map(item => {
      return (
        React.createElement("img", {
          className: "img-hidden",
          src: item.image,
          key: item.id,
          ref: img => this.imageRef = img,
          onLoad: this.loadImages,
          alt: "" }));


    });
    return (
      React.createElement("div", { className: "App" },
      !this.state.isLoaded ? React.createElement(Preloader, { ref: this.preloaderRef }) : null,
      React.createElement(Navbar, { ref: this.navbar }),
      images,
      React.createElement("div", {
        className: "slider-container",
        ref: this.sliderContainer,
        style: {
          background: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/590856/${this.state.slideCount}.jpg) center center / cover` } },


      React.createElement("div", { className: "slider-text-container" },
      React.createElement("div", { className: "slide-number-container" },
      React.createElement("div", { className: "number-wrap", ref: this.numberWrapRef },
      slideNumbers),

      React.createElement("span", { className: "slide-number-small" }, "/ 04")),

      React.createElement("div", { className: "slide-title-container" },
      React.createElement("div", { className: "title-wrap", ref: this.titleWrapRef },
      slideTitles)),


      React.createElement(SliderControls, {
        prev: this.prevSlide,
        next: this.nextSlide,
        expand: this.expand,
        ref: this.controlsRef })),


      React.createElement("div", { className: "slide-info-container" },
      React.createElement("div", { className: "slide-info-text" },
      React.createElement("div", { className: "slide-info-wrap" }, slideText),
      React.createElement("h4", null, "Elchin Gasanov"))),


      React.createElement("div", { },
      React.createElement("a", ),
      React.createElement("a", ))),

      /*React.createElement("div", { className: "slide-info-box" },
      React.createElement("a", { href: "/#" }, "Need more info & prices?"),
      React.createElement("h4", null, "Download our brochure now"))),*/


      React.createElement(Overlay, {
        close: this.expand,
        ref: this.overlay,
        imgClick: e => this.animateImgClick(e) })));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));