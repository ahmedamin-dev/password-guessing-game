import { useEffect, useState, type ChangeEvent } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, "SHOW PASS", 0, "DELETE"];
const generatePassword = () => {
  let pass = "";
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    pass += String(randomNum);
  }

  return pass;
};

const App = () => {
  const [inputPassword, setInputPassword] = useState<string>("");
  const [password, setPassword] = useState(() => generatePassword());
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean>(false);

  console.log(password);

  const handleClick = (num: number | string) => {
    if (typeof num === "number") {
      setInputPassword((prev) => (prev += String(num)));
    } else {
      setInputPassword((prev) => prev.slice(0, -1));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handleReset = () => {
    setError(false);
    setCorrect(null);
    setPassword(generatePassword());
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
  }, [inputPassword, password]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center gap-5">
        {!correct && (
          <>
            <h1 className="text-4xl">Try to guess the 4 digit Password</h1>
            <input
              type="text"
              disabled={error}
              value={inputPassword}
              onChange={handleChange}
              className="border text-center px-4 py-1 outline-none rounded-md"
            />
            <div>{password}</div>
            <div className="grid grid-cols-3 gap-4">
              {arr.map((num, index) => (
                <button
                  key={index}
                  disabled={error}
                  onClick={() => handleClick(num)}
                  className="border text-sm px-4 py-2 rounded-full hover:bg-gray-50/10 transition-colors cursor-pointer disabled:bg-gray-50/30"
                >
                  {num}
                </button>
              ))}
            </div>
          </>
        )}
        {correct === null ? (
          ""
        ) : (
          <div>{correct ? "Correct password" : "Wrong password try again"}</div>
        )}

        {(correct || error) && (
          <button
            className="border px-4 py-2 rounded-md cursor-pointer"
            onClick={handleReset}
          >
            {correct ? "Play" : "Try"} again
          </button>
        )}
      </section>
    </main>
  );
};

export default App;
