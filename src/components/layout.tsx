export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={
        "py-8 px-4 min-h-screen flex flex-col justify-center items-center w-full"
      }
      style={{
        fontFamily: `'Montserrat', sans-serif`,
      }}
    >
      <div className="flex items-center justify-center flex-col gap-5 px-4">
        <img
          src="/images/logo.svg"
          width={200}
          height={80}
          alt="Logo"
          className="overflow-hidden rounded-lg object-contain object-center w-44"
        />

        <h1 className="text-3xl font-bold text-center">
          File to Video Encoder & Decoder
        </h1>
      </div>

      <div className="flex flex-wrap mt-[6vh] gap-y-6">{children}</div>

      <div className="mt-5 flex items-center gap-2 flex-wrap justify-center">
        <p>
          Made by{" "}
          <a
            href="https://github.com/tuhinpal"
            target="_blank"
            className="underline"
          >
            Tuhin Kanti Pal
          </a>
        </p>
        <span className="hidden sm:block">-</span>
        <p>
          <a
            href="https://github.com/tuhinpal/qvid"
            target="_blank"
            className="underline"
          >
            Source code on Github
          </a>
        </p>
      </div>
    </section>
  );
}

export function Box({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="px-3 w-full md:w-1/2 max-w-xl">
      <div className="flex bg-zinc-50 shadow-sm border rounded-2xl p-6 h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-600 mb-5">{description}</p>

          <div className="mt-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
