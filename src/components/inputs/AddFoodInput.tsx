import { AutoComplete, Button } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import info from "../../assets/img/info.svg";
import breakfast from "../../assets/img/meals/breakfast.png";
import dinner from "../../assets/img/meals/dinner.png";
import lunch from "../../assets/img/meals/lunch.png";
import {
  breakfast_menu,
  dinner_menu,
  lunch_menu,
} from "../../assets/staticData/meals_data";
import { addFoodToCustomer } from "../../feature/customerSlice";

import { FoodInfosContext } from "../context/FoodInfosContext";
import "./inputs_styles.scss";
// https://www.npmjs.com/package/turnstone
// Turnstone is a highly customisable, easy-to-use autocomplete search component for React.

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AddFoodInput = ({
  customerFoodInput,
  id,
  setCustomerFoodInput,
  autoCompleteBorder,
}: // selectedTime,
// meridiumType,
{
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  autoCompleteBorder: string;
  // selectedTime: string;
  // meridiumType: string;
}) => {
  const dispatch = useDispatch();
  const { is_breakfast_time, is_dinner_time, is_lunch_time, selectedTime } =
    useContext(FoodInfosContext);
  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();

  const [value, setValue] = useState("");
  const [optionsData, setOptionsData] = useState<{ value: string }[]>([]);
  // const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  // !searchText ? [] : is_breakfast_time ? breakfast_menu : [];

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  const getPanelValue = (searchText: string) => {
    if (!searchText) {
      return [];
    } else {
      if (is_breakfast_time) {
        return breakfast_menu;
      } else if (is_lunch_time) {
        return lunch_menu;
      } else if (is_dinner_time) {
        return dinner_menu;
      } else {
        return [];
      }
    }
  };

  // const getPanelValue = (searchText: string) =>
  //   !searchText
  //     ? []
  //     : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    console.log("onChange", data);
    setValue(data);
  };

  let word: string = is_breakfast_time
    ? "breakfast"
    : is_lunch_time
    ? "lunch"
    : is_dinner_time
    ? "dinner"
    : "";

  useEffect(() => {
    if (customerFoodInput) console.log(customerFoodInput, "customerFoodInput");
  }, [customerFoodInput]);

  return (
    <>
      <div className="customer-food-add-input-btn-container">
        <>
          {customerFoodInput && selectedTime && is_serving_time ? (
            <div className="customer-food-meal-time">
              <img
                width={`50px`}
                src={
                  is_breakfast_time
                    ? breakfast
                    : is_lunch_time
                    ? lunch
                    : is_dinner_time
                    ? dinner
                    : ""
                }
                alt=""
              />
              <span>{word} time</span>
            </div>
          ) : null}
        </>

        <div className="customer-food-add-autocomplete__and__add-btn">
          <AutoComplete
            className="customer-food-add-autocomplete-input"
            value={customerFoodInput}
            onChange={(value) => {
              // console.log(value, "value");
              setCustomerFoodInput(value);
              if (customerFoodInput) {
                setInputStatus("");
              }
            }}
            options={selectedTime !== "" ? optionsData : undefined}
            style={{ width: 200, border: autoCompleteBorder }}
            onSelect={onSelect}
            onSearch={(text) => setOptionsData(getPanelValue(text))}
            status={inputStatus}
            placeholder={"Type a food item..."}
            allowClear
          />
          {/* this Input component has been replaced with antd AutoComplete Input */}
          {/* <Input
          className="customer-food-add-input"
          value={customerFoodInput}
          onChange={(e) => {
            setCustomerFoodInput(e.target.value);
            if (customerFoodInput) {
              setInputStatus("");
            }
          }}
          type="text"
          status={inputStatus}
          placeholder={"Type a food item..."}
          allowClear
        /> */}
          <Button
            className={
              customerFoodInput
                ? "customer-food-add-btn user_is_typing"
                : "customer-food-add-btn user_is_not_typing"
            }
            onClick={() => {
              dispatch(
                addFoodToCustomer({
                  id,
                  food_element: {
                    food_value: customerFoodInput,
                    food_id: randomInteger(1, 5000),
                    food_category:
                      customerFoodInput === `tacos`
                        ? `tacos_category`
                        : customerFoodInput === `pizza`
                        ? `pizza_category`
                        : "",
                  },
                })
              );
              if (!customerFoodInput) {
                setInputStatus("error");
              }
              setCustomerFoodInput("");
            }}
            // food_id: randomInteger(1, 5000),
          >
            <span>Add Food</span>
          </Button>
        </div>

        {customerFoodInput && selectedTime === "" ? (
          <div className="info__msg">
            <img width={`20px`} src={info} alt="" />
            <span>
              Select a time, so we can offer you propositions of food items and
              meals depending on that time.
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};
