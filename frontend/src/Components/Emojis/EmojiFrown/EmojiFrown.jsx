import { BsFillEmojiFrownFill } from 'react-icons/bs';
export default function EmojiFrown(props) {
    function handleClick() {
        props.passedProp(props.value);
    }

    return (
        <BsFillEmojiFrownFill onClick={handleClick} />
    )
}
