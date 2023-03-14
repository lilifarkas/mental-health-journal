import { BsEmojiLaughingFill } from 'react-icons/bs';

export default function EmojiLaughing(props) {
    
    function handleClick() {
        props.passedProp(props.value);
    }

    return (
        <BsEmojiLaughingFill onClick={handleClick} />
    )
}
