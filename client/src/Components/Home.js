import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container">
        <div className={`video-container ${showHome ? "fade-out" : ""}`}>
          <video autoPlay muted>
            <source src="vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={`home-content ${showHome ? "fade-in" : ""}`}>
          <div className="background">
            <nav>
              <div className="left">
                <div><img src="logo.png" alt="Logo" /></div>
              </div>
            </nav>

            <main>
              <div className="type">
                <h1>
                  Learn
                  <Typewriter
                    words={[' something new ', ' at your pace', ' smarter, not harder']}
                    loop={false}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </h1>
              </div>
              <div className="para">
                <p>
                  -FlashLearn allows students to flip cards to reveal the meanings of words, offering an interactive and engaging learning experience. Additionally, students can customize their study sessions by selecting any number of words, providing a flexible approach to mastering new vocabulary!!
                </p>
              </div>
              <h1 className="sign-head">Admin</h1>
              <div className="button">
                <Link to="/signup"><button>SignUp</button></Link>
                <Link to="/login"><button>Login</button></Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
