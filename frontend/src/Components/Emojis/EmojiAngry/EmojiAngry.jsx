import { BsEmojiAngryFill } from 'react-icons/bs';

export default function EmojiAngry(props) {

    function handleClick() {
        props.passedProp(props.value);
    }

    return (
        <BsEmojiAngryFill onClick={handleClick} />
    )
}
