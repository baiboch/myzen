export default function BrandLogo({ className = 'landing__logo', small = false }) {
    const classes = [className, small && 'landing__logo--small'].filter(Boolean).join(' ');

    return (
        <a href="/" className={classes}>
            My<span className="brand-logo__accent">ZEN</span>
        </a>
    );
}
