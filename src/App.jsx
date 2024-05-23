import "./App.css";
import React, { useState } from "react";
import masalaDosaImage from "./assets/masaladosa.avif";
import idliImage from "./assets/idlizom.avif";
import chai from "./assets/chai7.avif";
import buns from "./assets/buns.avif";
import naan from "./assets/naan.avif";
import butterChicken from "./assets/butter_chicken.avif";
import biryani from "./assets/biryani.avif";
import coffee from "./assets/coffee.avif";
import vadapav from "./assets/vadapav.avif";

const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const dishes = [
  {
    name: "Masala Dosa",
    price: 90,
    image: masalaDosaImage,
    type: ["Breakfast", "Snacks"],
  },
  {
    name: "Idli",
    price: 90,
    image: idliImage,
    type: ["Breakfast", "Snacks"],
  },
  {
    name: "tea",
    price: 20,
    image: chai,
    type: ["Breakfast", "Snacks", "Lunch", "Dinner"],
  },
  {
    name: "Mangalore Buns",
    price: 50,
    image: buns,
    type: ["Breakfast", "Snacks"],
  },
  {
    name: "Naan",
    price: 10,
    image: naan,
    type: ["Lunch", "Dinner"],
  },
  {
    name: "Butter Chicken",
    price: 300,
    image: butterChicken,
    type: ["Lunch", "Dinner"],
  },
  {
    name: "Chicken Biryani",
    price: 300,
    image: biryani,
    type: ["Lunch", "Dinner"],
  },
  {
    name: "Coffee",
    price: 25,
    image: coffee,
    type: ["Breakfast", "Snacks", "Lunch", "Dinner"],
  },
  {
    name: "Vada Pav",
    price: 17,
    image: vadapav,
    type: ["Breakfast", "Snacks"],
  },
];

function App() {
  const [foodtype, setFoodType] = useState("");
  const [menuDisp, setMenuDisp] = useState(false);
  const [submission, setSubmission] = useState(false);
  const [ordered, setOrdered] = useState(false);

  function handleOrder(e) {
    // perventing the reloading of the page on form submission
    e.preventDefault();

    //setting to default conditions on firing the submit btn
    setOrdered((order) => true);
    setSubmission(false);
    setMenuDisp(false);
  }

  function exitSubmission() {
    setSubmission((sub) => false);
  }

  return (
    <div className="page">
      <Header
        setMenuDisp={setMenuDisp}
        setSubmission={setSubmission}
        menuDisp={menuDisp}
      />
      {menuDisp ? (
        <div class={submission ? "blur-sm ..." : ""} onClick={exitSubmission}>
          <Mealbar foodtype={foodtype} setFoodType={setFoodType} />
          <Menudisplay foodtype={foodtype} />{" "}
        </div>
      ) : (
        <StartingText ordered={ordered} />
      )}
      {submission ? (
        <CheckOut
          ordered={ordered}
          setOrdered={setOrdered}
          handleOrder={handleOrder}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function Header({ setMenuDisp, setSubmission, menuDisp }) {
  function handleDisplayMenu() {
    setMenuDisp((menu) => !menu);
  }

  function handleSubmission() {
    setSubmission((sub) => !sub);
  }

  return (
    <header className="header">
      <div className="logo">
        <img
          style={{ height: "50px", width: "50px" }}
          src="src\assets\dry-pet-food-svgrepo-com.svg"
          alt="logo"
        />
      </div>

      <button
        onClick={handleDisplayMenu}
        class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ..."
      >
        Our Menue
      </button>

      {menuDisp ? (
        <button
          className="header-btn"
          class="bg-yellow-400 hover:bg-yellow-700 ... h-10 ... w-24 ... rounded-md ..."
          onClick={handleSubmission}
        >
          {menuDisp ? "Check-out" : ""}
        </button>
      ) : (
        <button class="blur-none bg-yellow-400 h-10 w-45 rounded-lg px-3">
          We're open from 7:00 - 24:00
        </button>
      )}
    </header>
  );
}

//working here
function CheckOut({ ordered, setOrdered, handleOrder }) {
  const [tableNumEntered, setTableNumEntered] = useState("");

  return (
    <form className="checkout-form" onSubmit={handleOrder}>
      <input
        type="number"
        placeholder="Table Number"
        value={tableNumEntered}
        onChange={(e) => setTableNumEntered(e.target.value)}
      />
      <div className="form-text">
        <p>{tableNumEntered ? "Your order will" : "Enter Your"} </p>
        <p>{tableNumEntered ? "be served shortly!!" : "Table Number!!"}</p>
        <button className="checkout-btn">Submit</button>
      </div>
    </form>
  );
}

function StartingText({ ordered }) {
  return (
    <div className="main-page-1">
      <div className="welcome-text">
        <p>{ordered ? "Yum on the way!" : "Hello Welcome to"} </p>
        <p style={{ color: "#ffbc0b" }}>
          {" "}
          {ordered ? "Your food will be" : "Dosa Delicassies"}
        </p>
        <p>{ordered ? "With you shortly." : "Order Now!!"} </p>
      </div>

      <div>
        <img
          style={{ height: "700px", width: "700px" }}
          src="src\assets\kathakali-svgrepo-com.svg"
          alt="Khatakali"
        />
      </div>
    </div>
  );
}
export default App;

function Mealbar({ foodtype, setFoodType }) {
  return (
    <div className="Mealbarbox">
      <ul>
        {mealTypes.map((ele, ind) => (
          <MealbarComponent
            type={ele}
            key={ind}
            foodtype={foodtype}
            setFoodType={setFoodType}
          />
        ))}
      </ul>
    </div>
  );
}

function MealbarComponent({ type, foodtype, setFoodType }) {
  function changeFoodType() {
    setFoodType(type);
  }

  return (
    <li>
      <button className="mealbarbtn" onClick={changeFoodType}>
        {type}
      </button>
    </li>
  );
}

function Menudisplay({ foodtype }) {
  return (
    <div className="Menu-display">
      {dishes.map((ele, ind) => (
        <Dishcomponent dish={ele} key={ind} foodtype={foodtype} />
      ))}
    </div>
  );
}

function Dishcomponent({ dish, foodtype }) {
  const [qty, setQty] = useState(0);
  const dishType = dish.type;

  function increaseQty() {
    setQty((q) => q + 1);
    console.log(`${dish.name} ${qty + 1} ${dish.price * (qty + 1)}`);
  }

  function decreaseQty() {
    setQty((q) => (q > 0 ? q - 1 : 0));
  }

  return (
    dishType.includes(foodtype) && (
      <div className="dish-div">
        <div className="dish-img">
          <img src={`${dish.image}`} alt={dish.name} />
        </div>
        <p>
          {dish.name} | ₹{dish.price}
        </p>
        <span className="qty">
          <button onClick={() => decreaseQty()}>-</button>
          <div>{qty}</div>
          <button onClick={() => increaseQty()}>+</button>
        </span>
      </div>
    )
  );
}
