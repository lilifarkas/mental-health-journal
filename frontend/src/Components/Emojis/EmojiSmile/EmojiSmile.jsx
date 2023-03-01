import { BsEmojiSmileFill } from 'react-icons/bs';
export default function EmojiSmile(props) {
    function handleClick() {
        props.passedProp(props.value);
    }

    return (
        <BsEmojiSmileFill onClick={handleClick} />
    )
}
