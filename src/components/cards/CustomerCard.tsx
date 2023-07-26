import { Modal } from "antd";
import { MouseEvent, useState } from "react";
import { CustomerButtons } from "../buttons/CustomerButtons";
import { OrderTimeTable } from "../collapse/OrderTime";
import { FoodTimeInfosContextProvider } from "../context/FoodTimeInfosContext";
import { GuestsCounter } from "../counters/GuestsCounter";
import { CloseXIconBtn } from "../icons/Icons";
import { AddFoodInput } from "../inputs/AddFoodInput";
import { DateInput } from "../inputs/DateInput";
import { SelectedfoodHorizontalDrag } from "../lists/SelectedfoodHorizontalDrag";
import { ButtonsModalContent } from "../modals/ButtonsModalContent";
import { FoodInfosModalContent } from "../modals/FoodInfosModalContent";
import { FoodListModalContent } from "../modals/FoodListModalContent";
import { LocationSelect } from "../selects/LocationSelect";
import "./card_styles.scss";

interface CustomerCardType {
  id: string;
  name: string;
  foodList: [{ food_value: string; food_id: number }];
  index: number;
  restauLocation: string | undefined;
}

function CustomerCard({
  id,
  name,
  foodList,
  restauLocation,
  index,
}: CustomerCardType) {
  // const { meridiumType, setMeridiumType } = useContext(FoodTimeInfosContext);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [customerFoodInput, setCustomerFoodInput] = useState("");
  const [location, setLocation] = useState({
    value: "",
    label: "Select the restaurant's address",
  });
  const [guests, setGuests] = useState<number | string>(0);
  // const [selectedTime, setSelectedTime] = useState("");
  const [orderDate, setOrderDate] = useState<string>("");
  // const [meridiumType, setMeridiumType] = useState("");

  const [showChoosenFood, setShowChoosenFood] = useState(false);
  const [showChoosenFoodInfos, setShowChoosenFoodInfos] = useState(false);
  //
  const [autoCompleteBorder, setAutoCompleteBorder] = useState("");
  function handleCloseClick(
    event: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>
  ): void {
    setOpenOrderModal(false);
  }

  return (
    <FoodTimeInfosContextProvider>
      <div className="customer-infos-card-container">
        <h5>{name}</h5>
        <div className="customer-infos-wrapper">
          <div className="customer-infos-wrapper-grp1">
            <div className="guests-comp">
              <GuestsCounter {...{ guests, setGuests }} />
            </div>
            <div className="location-comp">
              {/* https://rsuitejs.com/components/select-picker/ */}
              <LocationSelect
                {...{ restauLocation, id, location, setLocation }}
              />
            </div>
            <div className="date-comp">
              <DateInput {...{ orderDate, setOrderDate }} />
            </div>
          </div>
          <div className="customer-infos-wrapper-grp2">
            <div className="time-comp">
              <OrderTimeTable />
            </div>

            <div className="add-food-input-and-list-comps">
              <AddFoodInput
                {...{
                  id,
                  customerFoodInput,
                  setCustomerFoodInput,
                  autoCompleteBorder,
                }}
              />
              <SelectedfoodHorizontalDrag {...{ id, foodList }} />
            </div>
          </div>
        </div>

        <div className="customer-infos-footer">
          <CustomerButtons
            {...{ foodList, index, setOpenOrderModal, setAutoCompleteBorder }}
          />
        </div>

        <div>
          <Modal
            destroyOnClose
            // when closing the modal and then reopening it, only a portion of the next random generated bg image is displayed
            // by adding destroyOnClose prop, the bg image of ButtonsModalContent component is no longer
            // displayed partially, and so it's displayed totally
            className="order-customer-card-modal"
            open={openOrderModal}
            maskClosable={true}
            closable={false}
            keyboard={true}
            mask={true}
            onOk={() => setOpenOrderModal(false)}
            onCancel={() => setOpenOrderModal(false)}
            width={"80%"}
            footer={null}
            title={
              <div className="order-customer-card-modal-header">
                <span>Here is a summary of what you have picked :</span>
                <div className="order-customer-card-modal-header-close-icon">
                  <CloseXIconBtn {...{ handleCloseClick }} />
                </div>
              </div>
            }
          >
            <>
              {showChoosenFood ? (
                <FoodListModalContent
                  {...{
                    foodList,
                    setShowChoosenFood,
                    setShowChoosenFoodInfos,
                  }}
                />
              ) : showChoosenFoodInfos ? (
                <FoodInfosModalContent
                  {...{
                    location,
                    guests,
                    orderDate,
                    setShowChoosenFood,
                    setShowChoosenFoodInfos,
                  }}
                />
              ) : (
                <ButtonsModalContent
                  {...{
                    setShowChoosenFood,
                    setShowChoosenFoodInfos,
                    foodList,
                    location,
                    guests,
                    orderDate,
                  }}
                />
              )}
            </>
          </Modal>
        </div>
      </div>
    </FoodTimeInfosContextProvider>
  );
}

export default CustomerCard;
