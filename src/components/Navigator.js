import './Navigator.css';

export default function Navigator() {
    return (
        <nav className="navbar">
            <ul>
                <li> <a href="/">Home</a> </li>
                <li> <a href="/product">Product</a> </li>
                <li><a href="/support">Support</a> </li>
                <li><a href="/login">Sign Up</a> </li>
            </ul>
        </nav>
    );
}