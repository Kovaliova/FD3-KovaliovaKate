import React, { useRef, useCallback } from "react";
import mobileEvents from "../Events";

const ClientRow = React.memo(({ client, isEditing }) => {
  const surnameRef = useRef(null);
  const firstNameRef = useRef(null);
  const patronymicRef = useRef(null);
  const balanceRef = useRef(null);

  const handleStartEdit = useCallback(() => {
    mobileEvents.emit("startEdit", client.id);
  }, [client.id]);

  const handleSaveClick = useCallback(() => {
    mobileEvents.emit(
      "edit",
      client.id,
      surnameRef.current.value,
      firstNameRef.current.value,
      patronymicRef.current.value,
      parseFloat(balanceRef.current.value)
    );
  }, [client.id]);

  const handleDelete = useCallback(() => {
    mobileEvents.emit("delete", client.id);
  }, [client.id]);

  const renderInputOrText = (value, ref, type = "text") => {
    if (!isEditing) {
      return value;
    }
    const className =
      type === "number" ? "visible-input balance-input" : "visible-input cell-input";
    return <input defaultValue={value} ref={ref} type={type} className={className} />;
  };

  console.log("ClientRow render", client.id);

  const status = client.balance >= 0 ? "Active" : "Disable";

  const editButton = isEditing ? (
    <button onClick={handleSaveClick} className="action-button edit-button">Сохранить</button>
  ) : (
    <button onClick={handleStartEdit} className="action-button edit-button">Редактировать</button>
  );

  return (
    <tr className="client-row">
      <td>{renderInputOrText(client.surname, surnameRef)}</td>
      <td>{renderInputOrText(client.firstName, firstNameRef)}</td>
      <td>{renderInputOrText(client.patronymic, patronymicRef)}</td>
      <td>{renderInputOrText(client.balance, balanceRef, "number")}</td>
      <td className={`status-cell ${status === "Active" ? "status-active" : "status-disabled"}`}>
        {status}
      </td>
      <td>{editButton}</td>
      <td>
        <button onClick={handleDelete} className="action-button delete-button">Удалить</button>
      </td>
    </tr>
  );
});

export default ClientRow;