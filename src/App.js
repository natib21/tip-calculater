import { useEffect, useState } from "react";
import dollar from './images/icon-dollar.svg'
import person from './images/icon-person.svg'
const App = () => {
  const [input, setInput] = useState(0);
  const [inputTip, setInputTip] = useState(0);
  const [tip, setTip] = useState(0.00)
  const [total, setTotal] = useState(0.00)
  const [people, setPeople] = useState(0);
  const [addPeople, setAddPeople] = useState(false);
  const [active, setActive] = useState({
    activeObj: null,
    buttons: [{ val: 5 }, { val: 10 }, { val: 15 }, { val: 25 }, { val: 50 }]
  });

  const handleCalculate = (num, ele) => {
    setActive({ ...active, activeObj: active.buttons[num] });
    let percent = ele.val / 100;
    console.log(percent);
    if (total === 0 && people === 0) {
      setAddPeople(true)
    } else {
      setTotal(percent * input);

    }
  }
  useEffect(() => {
    setTip(total / people || 0);
  }, [total])
  const btnStyle = (num) => {
    if (active.buttons[num] === active.activeObj) {
      return 'btn-tip active';
    } else {
      return 'btn-tip';
    }
  }
  const handelInput = (e) => {
    setInput(e);
    if (input.length >= 0) {
      setAddPeople(true);
    } else { setAddPeople(false) }
  }
  const handelNumberOfPeople = (e) => {
    setPeople(e);
    setAddPeople(false);
  }
  const handleInputTip = (e) => {
    setInputTip(e);
    let percen = inputTip / 100;
    if (total === 0 && people === 0) {
      setAddPeople(true)
    } else {
      setTotal(percen * input);
    }

  }
  const handleReset = () => {
    setInput(0);
    setPeople(0);
    setTip(0)
    setTotal(0)
    setActive({ ...active, activeObj: null });
  }

  return <div className="app">
    <div className="app-container">
      <h1>spli<br />tter</h1>
      <div className="wrapper">
        <section className="calculater">
          <article className="bill">
            <h3 className="head"> Bill</h3>
            <input
              type="text"
              className={`input ${addPeople ? 'err' : ''}`}
              placeholder="0"
              value={input}
              onChange={(e) => handelInput(e.target.value)}
            />
            <span className="dollar">
              <img src={dollar} alt="dolar" />
            </span>
          </article>
          <article className="bill">
            <h3 className="head"> Select Tip %</h3>
            <div className="tip-buttons">
              {active.buttons.map((ele, index) =>
                <button
                  className={btnStyle(index)}
                  key={index}
                  onClick={() => handleCalculate(index, ele)}>
                  {ele.val}%
                </button>
              )}
              <input
                type="text"
                className="input-tip"
                placeholder="Custom"
                onChange={(e) => handleInputTip(e.target.value)}
              />
            </div>
          </article>
          <article className="bill">
            <div className="header"> <h3 className="head"> Number of People </h3>{addPeople ? <span className="error">Can't be zero</span> : ''}</div>
            <input
              type="text"
              className={`input ${addPeople ? 'err' : ''}`}
              placeholder="0"
              value={people}
              onChange={(e) => handelNumberOfPeople(e.target.value)} />
            <span className="dollar">
              <img src={person} alt="person" />
            </span>
          </article>
        </section>
        <section className="result">
          <article className="result-tip">
            <div className="tip-amount">
              <h3>Tip Amount  <span className="tip-person"><br /><span className="symbole">/</span>person</span></h3>
              <h2 className="tip-result">
                <img src={dollar} alt="dolar" />
                <span className="result-val">{tip.toFixed(2)}</span>
              </h2>
            </div>
            <div className="total">
              <h3>Total  <span className="tip-person"><br /><span className="symbole">/</span>person</span></h3>
              <h2 className="tip-result">
                <img src={dollar} alt="dolar" />
                <span className="result-val">{total.toFixed(2)}</span>
              </h2>
            </div>
          </article>
          <button className="btn-reset" onClick={() => handleReset()}>RESET</button>
        </section>
      </div>
    </div>
  </div>

}
export default App;