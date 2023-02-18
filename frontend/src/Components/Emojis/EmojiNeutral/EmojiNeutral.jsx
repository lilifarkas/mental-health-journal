import { BsEmojiNeutralFill } from 'react-icons/bs';

export default function EmojiNeutral(props) {
    
    function handleClick() {
        props.passedProp(props.value);
    }

    return (
        <BsEmojiNeutralFill onClick={handleClick} />
    )
}
