import React from 'react';
import './FooterStyles.css';

const Footer = () => {
  const contributors = [
    {
      name: "Foster Clark",
      image:
        "https://firebasestorage.googleapis.com/v0/b/happy-little-galaxies.appspot.com/o/profile_foster.jpg?alt=media&token=0e41f426-b4b5-4e53-b289-56295312dc31",
      github: "https://github.com/FosterClark48",
    },
    {
      name: "Heather Hayes",
      image:
        "https://firebasestorage.googleapis.com/v0/b/happy-little-galaxies.appspot.com/o/profile_heather.png?alt=media&token=d341f461-76a4-4718-a797-b5fe5411b31c",
      github: "https://github.com/hayes28",
    },
    {
      name: "Taylor Woodson",
      image:
        "https://firebasestorage.googleapis.com/v0/b/happy-little-galaxies.appspot.com/o/taylor-hlg.jpg?alt=media&token=46d1197b-4e1a-4dd1-909e-e8759a104911",
      github: "https://github.com/WoodsonTD",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="container">
        <div className="left">
          © 2023 happy Little Galaxies Inc.
        </div>
        <div className="right">
          {contributors.map((contributor, index) => (
            <a key={index} href={contributor.github} target="_blank" rel="noopener noreferrer">
              <img className="circle responsive-img" src={contributor.image} alt={contributor.name} style={{ marginLeft: '10px' }} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
