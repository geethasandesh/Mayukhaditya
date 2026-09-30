import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import logo from "../assets/logobg.png"

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let stars = [];
    const numStars = 120; 
    let animationFrameId;

    // Asteroid State Management
    let asteroid = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      length: 120,
      active: false,
      timer: null
    };

    function resize() {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      generateStars();
      if (!asteroid.active && !asteroid.timer) {
        scheduleAsteroid(2000); // Initial delay on first load
      }
    }

    function generateStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.012
        });
      }
    }

    // Spawns a single asteroid that can move across either diagonal path direction
    function launchAsteroid() {
      // 50% chance to move Down-Left vs Up-Right
      const directionIndex = Math.random() > 0.5; 
      const speedMultiplier = 6 + Math.random() * 4;

      if (directionIndex) {
        // --- DIRECTION 1: Moving Down & Left (Top/Right to Bottom/Left) ---
        asteroid.dx = -speedMultiplier;
        asteroid.dy = speedMultiplier;

        if (Math.random() > 0.5) {
          asteroid.x = Math.random() * (canvas.width * 0.8);
          asteroid.y = -50; // Spawn Top
        } else {
          asteroid.x = canvas.width + 50;
          asteroid.y = Math.random() * (canvas.height * 0.6); // Spawn Right
        }
      } else {
        // --- DIRECTION 2: Moving Up & Right (Bottom/Left to Top/Right) ---
        asteroid.dx = speedMultiplier;
        asteroid.dy = -speedMultiplier;

        if (Math.random() > 0.5) {
          asteroid.x = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.2);
          asteroid.y = canvas.height + 50; // Spawn Bottom
        } else {
          asteroid.x = -50;
          asteroid.y = Math.random() * (canvas.height * 0.6) + (canvas.height * 0.4); // Spawn Left
        }
      }
      
      asteroid.active = true;
    }

    // Enforces the strict 5-second delay before creating the next asteroid instance
    function scheduleAsteroid(delayMs = 5000) {
      asteroid.timer = setTimeout(() => {
        asteroid.timer = null;
        launchAsteroid();
      }, delayMs);
    }

    function drawAsteroid() {
      if (!asteroid.active) return;

      // Move the coordinates
      asteroid.x += asteroid.dx;
      asteroid.y += asteroid.dy;

      // Draw Sunrise Gradient Trail Line
      ctx.save();
      ctx.globalAlpha = 1.0;
      
      // Dynamically match trail direction to vector trajectory
      const trailX = asteroid.x - (asteroid.dx * (asteroid.length / 10));
      const trailY = asteroid.y - (asteroid.dy * (asteroid.length / 10));
      
      let gradient = ctx.createLinearGradient(trailX, trailY, asteroid.x, asteroid.y);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.4, '#ff7e5f'); // Sunrise coral pink
      gradient.addColorStop(1, '#feb47b');  // Sunrise glowing orange

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trailX, trailY);
      ctx.lineTo(asteroid.x, asteroid.y);
      ctx.stroke();

      // Draw Glowing Asteroid Head Core
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#feb47b';
      ctx.fillStyle = '#feb47b';
      ctx.beginPath();
      ctx.arc(asteroid.x, asteroid.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Check if completely off-screen bounds on any edge to trigger cooldown
      const outLeft = asteroid.x < -200 && asteroid.dx < 0;
      const outRight = asteroid.x > canvas.width + 200 && asteroid.dx > 0;
      const outTop = asteroid.y < -200 && asteroid.dy < 0;
      const outBottom = asteroid.y > canvas.height + 200 && asteroid.dy > 0;

      if (outLeft || outRight || outTop || outBottom) {
        asteroid.active = false;
        scheduleAsteroid(3000); // Exact 3 seconds delay before launching the next random one
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) {
          s.speed = -s.speed;
        }
        ctx.globalAlpha = Math.max(0.1, Math.min(s.alpha, 0.85));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Single Asteroid Sequence
      drawAsteroid();

      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (asteroid.timer) clearTimeout(asteroid.timer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 block"
    />
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-[#e8a020]/20 bg-black relative overflow-hidden z-0">
      <Starfield />
      <div className="max-w-[1800px] mx-auto px-5 lg:px-10 py-14 grid lg:grid-cols-[3.5fr_1.2fr_2fr_3.5fr] gap-10 lg:gap-12 relative z-10">
        <div>
          <Link to="/" className="inline-flex items-center mb-4" aria-label="Mayukhaditya home">
            <img
              src={logo}
              alt="Mayukhaditya"
              className="h-[2.7rem] md:h-[3.3rem] w-auto object-contain brightness-150"
            />
          </Link>
          <p className="text-muted text-sm max-w-md leading-relaxed">
            Mayukhaditya Private Limited specializes in SAP Digital Supply Chain solutions —
            helping organizations optimize warehouse operations, manufacturing logistics,
            transportation, and inventory management.
          </p>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-sunrise transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-sunrise transition">Services</Link></li>
            <li><Link to="/case-studies" className="hover:text-sunrise transition">Case Studies</Link></li>
            <li><Link to="/industries" className="hover:text-sunrise transition">Industries</Link></li>
            <li><Link to="/about" className="hover:text-sunrise transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-sunrise transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Focus Areas</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>SAP S/4HANA Supply Chain</li>
            <li>SAP Extended Warehouse Management</li>
            <li>Warehouse Automation</li>
            <li>AMS &amp; Production Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sunrise text-sm font-semibold uppercase tracking-wider mb-4">Locations</h4>
          <div className="grid grid-cols-2 gap-10">
            <div className="text-sm text-muted flex flex-col items-start gap-1">
              <div>
                <p className="font-semibold text-ink mb-0.5">Hyderabad</p>
                <p className="mb-0.5 text-xs">Mayukhaditya Private Limited</p>
                <p className="mb-1 text-xs" title="F No-201, P No-1103 & 1104, Avantika's Vasista, Hafeezpet, Hyderabad – 500049, Telangana, India">
                  F No-201, P No-1103 & 1104, Avantika's Vasista, Hafeezpet, Hyderabad – 500049, Telangana, India
                </p>
                <p>
                <a href="mailto:info@mayukhaditya.com" className="text-xs text-ink hover:underline font-medium block mt-1">
                  info@mayukhaditya.com
                </a>
                </p>
              </div>

            </div>
            <div className="text-sm text-muted flex flex-col items-start gap-1">
              <div>
                <p className="font-semibold text-ink mb-0.5">Dubai</p>
                <p className="mb-0.5 text-xs">Mayukhaditya LLC</p>
                <p className="mb-1 text-xs" title="Buhaleeba Plaza 503A, Plot 256-0, Al Murqabat Street, Deira, Dubai, United Arab Emirates">
                  Buhaleeba Plaza 503A, Plot 256-0, Al Murqabat Street, Deira, Dubai, United Arab Emirates
                </p>
                <a href="mailto:info@mayukhaditya.com" className="text-xs text-ink hover:underline font-medium block mt-1">
                  info@mayukhaditya.com
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e8a020]/15 py-6 text-center text-sm text-muted relative z-10">
        © {new Date().getFullYear()} Mayukhaditya Private Limited. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
