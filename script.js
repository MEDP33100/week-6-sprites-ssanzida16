// Fetch data and create sprites
fetch('./data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item, index) => {
      const sprite = new SongSprite(item, index);
      sprite.render();
    });
  })
  .catch((error) => console.error('Error fetching data:', error));

// SongSprite Class
class SongSprite {
  constructor(song, index) {
    this.title = song.title;
    this.artist = song.artist;
    this.duration = song.duration;
    this.index = index;
  }

  // Render sprite to DOM
  render() {
    const container = document.getElementById('sprite-container');
    const sprite = document.createElement('div');
    sprite.className = 'sprite';
    sprite.innerHTML = `
      <strong>${this.title}</strong>
      <p>By: ${this.artist}</p>
      <p>Duration: ${this.duration}</p>
    `;
    container.appendChild(sprite);

    // Animate with GSAP
    this.animateSprite(sprite);
  }

  // Animate sprite with GSAP
  animateSprite(sprite) {
    gsap.from(sprite, {
      duration: 1,
      x: Math.random() * 600 - 300,
      y: Math.random() * 600 - 300,
      scale: 0.5,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)'
    });

    // Hover animation
    sprite.addEventListener('mouseenter', () => {
      gsap.to(sprite, { scale: 1.2, duration: 0.3 });
    });

    sprite.addEventListener('mouseleave', () => {
      gsap.to(sprite, { scale: 1, duration: 0.3 });
    });
  }
}
