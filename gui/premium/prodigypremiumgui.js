const swalScript = document.createElement('script');
swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(swalScript);

swalScript.onload = () => {
  // Your main script starts here
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.style = `
    background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    border-radius: 10px;
    padding: 20px;
    width: 95vw; /* Take up more width in landscape mode */
    max-height: 85vh; /* Adjust height to balance with width */
    overflow-y: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: block; /* Visible on load */
  `;

  const title = document.createElement('h1');
  title.textContent = 'PXI Fusion Premium';
  title.style = 'color: white; text-align: center; margin-bottom: 10px;';
  menu.appendChild(title);

  const instructionText = document.createElement('p');
  instructionText.textContent = 'Press Shift to open/close';
  instructionText.style = `
    color: white;
    text-align: center;
    font-size: 12px;
    margin-bottom: 20px;
  `;
  menu.appendChild(instructionText);

  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.className = 'search-bar';
  searchBar.placeholder = 'Search hacks...';
  searchBar.style = `
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #fff;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 16px;
  `;
  menu.appendChild(searchBar);

  const sectionMenuBar = document.createElement('div');
  sectionMenuBar.className = 'section-menu-bar';
  sectionMenuBar.style = `
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    gap: 10px;
  `;

  const hacks = [
    {
      "hack": {
        "name": "Disable Math",
        "description": "Disables All Math Problems",
        "section": "Battle",
        "dist": "",
        "success": "You have disabled math!",
        "developing": "false"
      }
    },
    {
      "hack": {
        "name": "Enable Math",
        "description": "Enables All Math Problems",
        "section": "Battle",
        "dist": "alert("Hi")",
        "success": "You Will Now Do Math",
        "developing": "false"
      }
    }
  ];

  const allHacksButton = document.createElement('button');
  allHacksButton.textContent = 'All Hacks';
  allHacksButton.style = `
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid #fff;
    border-radius: 5px;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  `;

  allHacksButton.addEventListener('mouseenter', () => {
    allHacksButton.style.backgroundColor = '#00D1B2';
  });
  allHacksButton.addEventListener('mouseleave', () => {
    allHacksButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  });

  allHacksButton.addEventListener('click', () => {
    showHacksBySection('all');
  });
  sectionMenuBar.appendChild(allHacksButton);

  const sections = new Set();
  hacks.forEach(({ hack }) => sections.add(hack.section));

  sections.forEach(section => {
    const sectionButton = document.createElement('button');
    sectionButton.textContent = section;
    sectionButton.style = `
      background-color: rgba(255, 255, 255, 0.1);
      border: 2px solid #fff;
      border-radius: 5px;
      color: white;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;
    `;

    sectionButton.addEventListener('mouseenter', () => {
      sectionButton.style.backgroundColor = '#00D1B2';
    });
    sectionButton.addEventListener('mouseleave', () => {
      sectionButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    sectionButton.addEventListener('click', () => {
      showHacksBySection(section);
    });

    sectionMenuBar.appendChild(sectionButton);
  });

  menu.appendChild(sectionMenuBar);

  const hackSectionContainer = document.createElement('div');
  hackSectionContainer.className = 'hack-section-container';
  hackSectionContainer.style = 'margin-top: 20px;';
  menu.appendChild(hackSectionContainer);

  function showHacksBySection(section) {
    hackSectionContainer.innerHTML = '';

    if (section === 'all') {
      hacks.forEach(({ hack }) => {
        createHackCard(hackSectionContainer, hack);
      });
      return;
    }

    hacks
      .filter(({ hack }) => hack.section === section)
      .forEach(({ hack }) => {
        createHackCard(hackSectionContainer, hack);
      });
  }

  hacks.forEach(({ hack }) => {
    createHackCard(hackSectionContainer, hack);
  });

  function createHackCard(container, hack) {
    const { name, description, dist, success, developing } = hack;

    const hackCard = document.createElement('div');
    hackCard.className = 'hack-card';
    hackCard.style = `
      background-color: rgba(0, 0, 0, 0.7);
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;
      color: white;
      border: 2px solid transparent;
      transition: border 0.3s ease;
    `;

    hackCard.addEventListener('mouseenter', () => {
      hackCard.style.border = '2px solid #00D1B2';
    });
    hackCard.addEventListener('mouseleave', () => {
      hackCard.style.border = '2px solid transparent';
    });

    hackCard.innerHTML = `
      <strong>${name}</strong>
      <p>${description}</p>
    `;

    hackCard.addEventListener('click', async () => {
      await eval(dist);
      if (developing === 'false') {
        Swal.fire({
          title: 'Success!',
          text: success,
          icon: 'success',
          confirmButtonText: 'Close'
        });
      } else {
        Swal.fire({
          title: 'Under Development',
          text: 'This hack is still under development.',
          icon: 'info',
          confirmButtonText: 'Close'
        });
      }
    });

    container.appendChild(hackCard);
  }

  function searchHacks(query) {
    const filteredHacks = hacks.filter(({ hack }) =>
      hack.name.toLowerCase().includes(query.toLowerCase()) ||
      hack.description.toLowerCase().includes(query.toLowerCase())
    );

    hackSectionContainer.innerHTML = '';

    if (filteredHacks.length === 0) {
      hackSectionContainer.innerHTML = '<p style="color: white;">No hacks found.</p>';
    } else {
      filteredHacks.forEach(({ hack }) => {
        createHackCard(hackSectionContainer, hack);
      });
    }
  }

  searchBar.addEventListener('input', (e) => {
    searchHacks(e.target.value);
  });

  let isMenuOpen = true;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
      isMenuOpen = !isMenuOpen;
      menu.style.display = isMenuOpen ? 'block' : 'none';
    }
  });

  document.body.appendChild(menu);
};
