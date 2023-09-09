import Link from 'next/link';

function Header() {
  return (
    <header>
      <div className="Logo">
        <Link href="/">
          <a>
            <img src="Logo.png" alt="AnalyzeAI" />
          </a>
        </Link>
      </div>
      {/* extra features here */}
    </header>
  );
}

export default Header;