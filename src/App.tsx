import { useEffect, useState, type ChangeEvent } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const password = "1234";

const App = () => {
  const [inputPassword, setInputPassword] = useState<string>("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleClick = (num: number) => {
    setInputPassword((prev) => (prev += String(num)));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handleReset = () => {
    setError(false);
    setCorrect(null);
  };

  useEffect(() => {
    const handleGameState = () => {
      if (inputPassword.length === password.length) {
        if (inputPassword === password) {
          setCorrect(true);
          setInputPassword("");
        } else {
          setCorrect(false);
          setError(true);
          setInputPassword("");
        }
      }
    };

    handleGameState();
  }, [inputPassword]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center gap-8">
        <h1 className="text-4xl">Try to guess the 4 digit Password</h1>
        <input
          type="text"
          disabled={error}
          value={inputPassword}
          onChange={handleChange}
          className="border text-center px-4 py-1 outline-none rounded-md"
        />
        <div className="flex items-center gap-4">
          {arr.map((num, index) => (
            <button
              key={index}
              disabled={error}
              onClick={() => handleClick(num)}
              className="border px-4 py-2 rounded-full cursor-pointer disabled:bg-gray-50/30"
            >
              {num}
            </button>
          ))}
        </div>
        {correct === null ? (
          ""
        ) : (
          <div>{correct ? "Correct password" : "Wrong password try again"}</div>
        )}

        {correct === false && (
          <button
            className="border px-4 py-2 rounded-md cursor-pointer"
            onClick={handleReset}
          >
            Try again
          </button>
        )}
      </section>
    </main>
  );
};

export default App;
