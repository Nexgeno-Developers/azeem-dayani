//smooth scroll
var containerEl = document.querySelector(".scroll-container");
var multiplier = 0.5;
var lerp = 0.05; // для FF
var mediaQuery = window.matchMedia("(max-width: 992px)");

if (mediaQuery.matches) {
  multiplier = 2;
  lerp = 0.07;
}

var locoScroll = new LocomotiveScroll({
  el: containerEl,
  smooth: true,
  lerp: lerp,
  multiplier: multiplier,
  touchMultiplier: 1.5,
  firefoxMultiplier: 100,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
});
gsap.registerPlugin(ScrollTrigger);

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(containerEl, {
  scrollTop: function scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect: function getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: containerEl.style.transform ? "transform" : "fixed",
});

document.body.style.overflow = "";
ScrollTrigger.refresh();
locoScroll.start();

// for music lines
for (let i = 0; i < 120; i++) {
  const left = i * 2 + 1;
  const anim = Math.floor(Math.random() * 75 + 400);
  const height = Math.floor(Math.random() * 25 + 3);
  // console.log(height);

  document.querySelector(
    "#bars"
  ).innerHTML += `<div class="bar" style="left:${left}px;animation-duration:${anim}ms;height:${height}px"></div>`;
}

// link with image hover effect
document.addEventListener("DOMContentLoaded", function () {
  const filmLinks = document.querySelectorAll(".film_link");
  const filmImages = document.querySelectorAll(".film_img");

  function moveImg(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    gsap.to(filmImages, {
      duration: 1,
      x: mouseX - window.innerWidth / 2,
      y: mouseY - window.innerHeight / 2,
      ease: "expo.ease",
    });
  }

  function linkHover(e) {
    const imgId = this.parentElement.getAttribute("data-img");
    if (e.type === "mouseenter") {
      filmImages.forEach((img) => {
        gsap.to(img, {
          autoAlpha: 0,
          scale: 0.3,
        });
        img.classList.remove("active"); // Remove 'active' class from all images
      });

      const activeImg = document.getElementById(imgId);
      gsap.to(activeImg, {
        autoAlpha: 1,
        scale: 1,
      });
      activeImg.classList.add("active"); // Add 'active' class to the shown image
    } else if (e.type === "mouseleave") {
      gsap.to(filmImages, {
        autoAlpha: 0,
        scale: 0.3,
      });
    }
  }

  filmLinks.forEach((link) => {
    link.addEventListener("mouseenter", linkHover);
    link.addEventListener("mouseleave", linkHover);
    link.addEventListener("mousemove", moveImg);
  });
});

// // // heading Animation
// gsap.registerPlugin(ScrollTrigger);
// // Splits text into words and characters
// const text = new SplitType(".heading-anim", { types: "chars" });
// gsap.set(".heading-anim", { autoAlpha: 1 }); // prevents flash of unstyled content
// gsap.set(text.chars, { yPercent: 100 }); // set initial state
// // Page Load Animation
// const initialAnimation = gsap.to(text.chars, {
//   yPercent: 0,
//   ease: "sine.out",
//   stagger: { from: "center", amount: 0.5, ease: "power1.out" },
//   onComplete: activateScrollTrigger, // Activate ScrollTrigger after initial animation
// });

// // User Scroll Animation
// function activateScrollTrigger() {
//   gsap.to(text.chars, {
//     yPercent: -100,
//     stagger: { from: "center", amount: 1 },
//     scrollTrigger: {
//       trigger: ".heading-anim",
//       start: "top top",
//       end: () => `+=${document.querySelector(".heading-anim").offsetHeight * 0.25}`,
//       scrub: 1,
//       markers: true,
//     },
//   });
// }

// const para = document.querySelector("para-anim");
// const text = "animation";
// const arr = text.split("");
// generateText(arr);
// function generateText(text) {
//   text.forEach((data) => {
//     const span = document.createElement("span");
//     span.classList.add("char");
//     span.innerHTML = data;
//     para.appendChild(span);
//   });
// }
// // gsap
// gsap.from(".char", {
//   y: 100,
//   stagger: 0.07,
//   delay: 0.2,
//   ease: "back.out",
//   duration: 1,
// });

// Initialize SplitText
gsap.registerPlugin(SplitText);

// Check if SplitText is available
if (typeof SplitText !== "undefined") {
  // Example usage of SplitText
  document.querySelectorAll(".animated-heading").forEach((element) => {
    const split = new SplitText(element, {
      linesClass: "split-line",
      type: "lines, words, chars",
    });
    // GSAP animation with ScrollTrigger
    gsap.from(split.chars, {
      y: 100,
      stagger: 0.1,
      delay: 0.2,
      ease: "back.out",
      duration: 1,
      scrollTrigger: {
        trigger: element,
        once: true,
        start: "top bottom", // When the top of the trigger element reaches the bottom of the viewport
        end: "bottom center", // When the bottom of the trigger element reaches the top of the viewport
        scrub: 1, // Smoothly scrubs the animation
        markers: false, // Enable markers for debugging (optional)
      },
    });
  });

  // Example usage of SplitText
  document.querySelectorAll(".animated-para").forEach((element) => {
    const split = new SplitText(element, {
      linesClass: "split-line",
      type: "lines, words",
    });
    // GSAP animation with ScrollTrigger
    gsap.from(split.words, {
      duration: 0.8,
      opacity: 0,
      y: 80,
      ease: "in",
      stagger: 0.01,
      scrollTrigger: {
        trigger: element,
        once: true,
        start: "top bottom", // When the top of the trigger element reaches the bottom of the viewport
        end: "bottom center", // When the bottom of the trigger element reaches the top of the viewport
        scrub: 1, // Smoothly scrubs the animation
        markers: false, // Enable markers for debugging (optional)
      },
    });
  });
} else {
  console.error("SplitText plugin is not available.");
}

// var animatedTextNodes = document.querySelectorAll(".animated-para");

// if (animatedTextNodes.length && !mediaQuery.matches) {
//   animatedTextNodes.forEach(function (node) {
//     node.split = new SplitText(node, {
//       type: "lines,words",
//       linesClass: "split-line",
//     });
//   });
// }

function splitTexthalf(selector) {
  var elements = document.querySelectorAll(selector);

  elements.forEach(function (element) {
    var text = element.textContent;
    var splittedText = text.split("");
    var halfValue = Math.ceil(splittedText.length / 2);

    var clutter = "";

    splittedText.forEach(function (char, index) {
      // Replace spaces with non-breaking spaces to ensure they are visible
      if (char === " ") {
        char = "&nbsp;";
      }
      if (index < halfValue) {
        clutter += `<span class="char1">${char}</span>`;
      } else {
        clutter += `<span class="char2">${char}</span>`;
      }
    });

    element.innerHTML = clutter;
  });
}

splitTexthalf(".heading-anim");

function animateText(selector) {
  // General ScrollTrigger options
  const scrollTriggerOptions = {
    start: "top bottom", // Adjust based on when you want the animation to start
    end: "center center",
    scrub: 3,
    once: true,
    markers: false, // Remove or set to false in production
  };

  // Select all elements matching the selector
  document.querySelectorAll(selector).forEach((element) => {
    // Animate chars within each element
    gsap.from(element.querySelectorAll("span.char1"), {
      y: 100,
      opacity: 0,
      stagger: -0.1,
      ease: "power2.out",
      scrollTrigger: {
        ...scrollTriggerOptions,
        trigger: element, // Set specific trigger for each element
      },
    });

    gsap.from(element.querySelectorAll("span.char2"), {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        ...scrollTriggerOptions,
        trigger: element, // Set specific trigger for each element
      },
    });
  });
}

// Call the function for elements with the class 'heading-anim'
animateText(".heading-anim");

// image reveal animate

gsap.utils.toArray(".reveal-img").forEach((container) => {
  let image = container.querySelector("img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 120%",
      toggleActions: "play none none reverse",
    },
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, {
    duration: 3,
    yPercent: 100,
    skewX: 0.1,
    ease: "expo",
  });
  tl.from(
    image,
    {
      duration: 3,
      yPercent: -100,
      skewX: 0.1,
      ease: "expo",
    },
    0
  );
});

var stopCircle = document.getElementsByClassName("anima");
for (var i = 0; i < stopCircle.length; i++) {
  if (stopCircle[i].matches(":hover")) {
  }
  stopCircle[i].addEventListener("mouseover", function (event) {
    document
      .getElementsByClassName("circle-arround-two-1")[0]
      .classList.add("stopanima");
    document
      .getElementsByClassName("circle-arround-two-2")[0]
      .classList.add("stopanima");
    document
      .getElementsByClassName("circle-arround-two-3")[0]
      .classList.add("stopanima");
    document
      .getElementsByClassName("circle-arround-two-4")[0]
      .classList.add("stopanima");
  });
  stopCircle[i].addEventListener("mouseout", function (event) {
    document
      .getElementsByClassName("circle-arround-two-1")[0]
      .classList.remove("stopanima");
    document
      .getElementsByClassName("circle-arround-two-2")[0]
      .classList.remove("stopanima");
    document
      .getElementsByClassName("circle-arround-two-3")[0]
      .classList.remove("stopanima");
    document
      .getElementsByClassName("circle-arround-two-4")[0]
      .classList.remove("stopanima");
  });
}

// GSAP animation
// gsap.fromTo(
//   ".preloader-main svg",
//   { strokeDasharray: 4500, strokeDashoffset: 4500, fillOpacity: 0 },
//   {
//     strokeDashoffset: 0,
//     fillOpacity: 1,
//     duration: 3,
//     ease: "power1.inOut",
//     onComplete: function () {
//       // Move the SVG back to its original place after animation
//       gsap.to(".preloader-main", {
//         opacity: 0,
//         duration: 1,
//         onComplete: function () {
//           document.querySelector(".preloader-main").style.display = "none";
//         },
//       });
//     },
//   }
// );

// Select all .film_list elements
const filmLists = document.querySelectorAll(".film_list");

// Loop through each .film_list and apply the animation
filmLists.forEach((list) => {
  gsap.from(list.querySelectorAll("li a"), {
    y: "100px",
    stagger: 0.3,
    ease: "back.out",
    duration: 1,
    scrollTrigger: {
      trigger: list, // Trigger each list individually
      once: true,
      start: "top bottom", // When the top of the trigger element reaches the bottom of the viewport
      end: "bottom center", // When the bottom of the trigger element reaches the center of the viewport
      scrub: 1, // Smoothly scrubs the animation
      markers: false, // Set to true if you want to debug with markers
    },
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const sections = document.querySelectorAll(".section");
  
//   // Create a GSAP timeline for background color transitions
//   const colorTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".section",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 1,
//       markers: true,
//       onUpdate: (self) => {
//         // Iterate over each section and update its background color
//         sections.forEach((section, index) => {
//           const nextSection = sections[index + 1] || sections[0];
//           const sectionColor = section.getAttribute("data-bg");
//           const nextSectionColor = nextSection.getAttribute("data-bg");
          
//           const progress = self.progress;
//           const blend = progress * (sections.length - 1) - index;
          
//           // Interpolate between current and next section colors
//           const interpolatedColor = gsap.utils.interpolate(
//             sectionColor,
//             nextSectionColor,
//             blend
//           );
          
//           section.style.backgroundColor = interpolatedColor;
//         });
//       },
//     },
//   });

//   // Optional: Add some delays or effects for better visual experience
//   sections.forEach((section) => {
//     colorTimeline.to(section, {
//       duration: 1,
//       autoAlpha: 1,
//       ease: "power1.out",
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.preloader');
  const header = document.getElementById('header');
  const content = document.getElementById('home_page');
  const mainLogo = document.querySelector('.main_logo');

  // Initialize GSAP Timeline
  const tl = gsap.timeline({ 
      onComplete: () => {
          // Hide the loader and show the content after animation
          loader.style.display = 'none';
          content.style.display = 'block';
      }
  });

  // Add animations to the timeline
  tl.set('.preloader svg path', {
      strokeDasharray: 4500,
      strokeDashoffset: 4500,
      fillOpacity: 0,
      stroke: '#ffffff'
  })
  .to('.preloader svg', {
      opacity: 1,
      duration: 0.5 // Fade-in duration for SVG
  })
  .to('.preloader svg path', {
      strokeDashoffset: 0,
      fillOpacity: 1,
      duration: 3,
      ease: 'cubic.inOut'
  })
  .to('.preloader', {
      opacity: 0,
      duration: 0.5, // Fade-out duration for preloader
      delay: 0.5 // Delay to ensure the path animation is complete
  })
  .fromTo(mainLogo, {
      opacity: 0,
      y: 50 // Start position (below the initial position)
  }, {
      opacity: 1,
      y: 0, // End position (normal position)
      duration: 1, // Duration of the fade and move-up animation
      ease: 'power3.out'
  }, '-=0.5') // Overlap with preloader fade-out
  .fromTo(header, {
      opacity: 0,
      y: -50 // Start position (below the initial position)
  }, {
      display: 'block' ,
      opacity: 1,
      y: 0, // End position (normal position)
      duration: 1, // Duration of the fade and move-up animation
      ease: 'back.out'
  }, '-=0.5'); // Overlap with preloader fade-out
});



ScrollTrigger.addEventListener("refresh", function () {
  return locoScroll.update();
}); // после того, как все настроено, вызываем refresh() ScrollTrigger и он обновит и LocomotiveScroll,
// потому что могли быть добавлены отступы и т. д.

ScrollTrigger.refresh();
