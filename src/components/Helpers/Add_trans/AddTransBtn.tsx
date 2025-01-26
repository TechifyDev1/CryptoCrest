import { FaPlus } from "react-icons/fa"
import './Add.css';
import { useNavigate } from "react-router-dom";

const AddTransBtn: React.FC = () => {
    const navigate = useNavigate();
    return(
        <button className="add-new" onClick={() => navigate('/transactions/new')}>
            <FaPlus size={25} />
        </button>
    )
}

export default AddTransBtn;