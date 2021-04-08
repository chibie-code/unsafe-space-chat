/*

import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import Draggable from 'react-draggable';

const EmojiData = ({ chosenEmoji }) => (
  <div>
    <strong>Unified:</strong> {chosenEmoji.unified}
    <br />
    <strong>Names:</strong> {chosenEmoji.names.join(", ")}
    <br />
    <strong>Symbol:</strong> {chosenEmoji.emoji}
    <br />
    <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
  </div>
);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  
  const textBoxRef = useRef(null);

  const addEmoji = (e) => {
    const text = e.target.value;
    const text_array = text.split("");
    // const caretPosition = textBoxRef.current.selectionEnd;
    const caretPosition = e.target.selectionEnd;
    const emoji = (chosenEmoji.emoji == null)?" ":chosenEmoji.emoji;
    const leftHalf = text.substring(caretPosition);
    const rightHalf = text.substring(0, caretPosition);
    const text_emoji = leftHalf+emoji+rightHalf;
    e.target.value = text_emoji;
    e.target.selectionEnd = text_emoji.length;
    console.log("Caret position: ",caretPosition);
    console.log("textBoxRef.current:",textBoxRef.current);
    console.log("text_array:",text_array);
    console.log("text_emoji:",text_emoji);
    // if(typeof emoji !== "null"){
    // }
    // else{
      // setMsg(p=>produce(p,d=>(d+chosenEmoji.emoji)));
      // setChosenEmoji("");
      // console.log("msg:",msg);

    // }
  };

<List.Item>
        <div>
          <Draggable>
            <div
            style={{width: "auto", height: "auto", border: "solid white 3px", position: "fixed"}}>
              <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_NEUTRAL}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
              />
              {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
            </div>
          </Draggable>
        </div>
      </List.Item>
*/