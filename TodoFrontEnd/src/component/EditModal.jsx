import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { format, parseISO, isValid } from "date-fns";
import hi from "date-fns/locale/hi"; // import the Hindi (India) locale
import "./todo.scss";

const EditModal = ({ isOpen, onClose, onSave, initialText, initialStatus, initialDate, taskId }) => {
    const [editedText, setEditedText] = useState(initialText || '');
    const [editedStatus, setEditedStatus] = useState(initialStatus || '');
    const [editedDate, setEditedDate] = useState(initialDate || new Date().now);
  
    const handleSave = () => {
      //console.log("handle Save: ", taskId);
      onSave(editedText || initialText, editedStatus || initialStatus, editedDate || initialDate, taskId);
      onClose();
    };

    const formatDate = (date) => {
        if (isValid(date)) {
          return format(date, 'EEEE dd MMMM HH:mm:ss', { locale: hi });
        }
        return "";
      };

    return (
      <div style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="input-container">
          <input
            type="text"
            placeholder={initialText}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="text"
            placeholder={initialStatus}
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          />
          <ReactDatePicker
          selected={editedDate ? parseISO(editedDate) : null}
          onChange={(date) => setEditedDate(date.toISOString())}
          placeholderText={initialDate}
          customInput={
            <input
              style={{ cursor: 'pointer' }}
              value={formatDate(parseISO(editedDate))}
              readOnly
            />
          }
        />
          <button onClick={handleSave} className="btn">Save</button>
          <button onClick={onClose} className="btn">Cancel</button>
        </div>
      </div>
    );
  };

  export default EditModal;
  
