import Link from 'next/link';

export const Header = () => {
  return (
    <header className="py-10">
      <div className="container mx-auto text-center">
        <Link href="/">
          <a className="header-title">smallpine8 blogテスト</a>
        </Link>
      </div>
    </header>
  )
}