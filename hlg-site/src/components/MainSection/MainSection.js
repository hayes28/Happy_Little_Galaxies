import React from 'react';
import'./MainSection.css';

const MainSection = () => {
  return (
    <section className="main-section" style={{ backgroundColor: '#3E4068' }}>
      <div className='bob-ross-image'>

      </div>
      <div className='welcome-text'>
        <h1>Welcome to happy Little Galaxies!</h1>
        <p className='call-to-action'>
          Dive into an interstellar journey with Bob Ross!<br />
          Explore the Cosmos, Bob Ross Style:
        </p>
        <div className='instructions'>
          <p>
            Here at Happy Little Galaxies, we bring a unique twist to the legendary Bob Ross’s painting style. Journey through a universe of art where each
            brushstroke takes you closer to the stars. Our collection features a series of space-themed paintings, each inspired by the gentle
            artistry of Bob Ross and the majestic beauty of the cosmos.
          </p>
          <p>
            Instructions on how to use the filtering system of the website:<br />
            How to Navigate Your Space Art Adventure:
          </p>
          <p className="indented-paragraph">
            <strong>1. Color Your Galaxy:</strong> Use our color swatches to filter through the paintings. Whether you’re drawn to the vibrant hues
            of a nebula or the subtle shades of distant stars, find your palette here.
          </p>
          <p className="indented-paragraph">
            <strong>2. Choose Your Cosmic Subject:</strong> Select from a variety of space subjects using our dropdown box. From planets to galaxies,
            find the celestial bodies that speak to your soul.
          </p>
          <p>
            Apply and Reset Filters Easily: Once you’ve picked your colors and subjects, hit ‘Apply’ to see the magic happen.
            Want to start over or adjust your choices? Simply click ‘Reset’ or remove individual filters with a click on the ‘x’ next to each one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
