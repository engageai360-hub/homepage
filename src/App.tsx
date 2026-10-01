import { useEffect } from "react";
import { SHOW_PROOF } from "./lib/config";
import { track } from "./lib/analytics";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { Problem, What } from "./components/WhatProblem";
import How from "./components/How";
import Make from "./components/Make";
import { Different, Who } from "./components/Different";
import { Faq, FinalCta, Footer, Founder, Proof, StickyCta } from "./components/Closing";

export default function App() {
  useEffect(() => {
    track("page_view", { path: window.location.pathname });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <What />
        <Problem />
        <How />
        <Make />
        <Different />
        <Who />
        {SHOW_PROOF && <Proof />}
        <Founder />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
