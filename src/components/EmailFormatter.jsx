import React, { useEffect, useRef, useState } from 'react';

function EmailFormatter({emailBody, setEmailBody}) {
    const emailFormatterRef = useRef(null);

    useEffect(() => {
        const container = emailFormatterRef.current;
        container && (container.innerHTML = formatText(emailBody));
    }, [])


    const handleInput = () => {
        const container = emailFormatterRef.current;
        const caretOffset = getCaretCharacterOffsetWithin(container);

        // Update the content with the formatted text
        // container.innerHTML = formatText(container.textContent);

        console.log(JSON.stringify(container.textContent))
        container.innerHTML = JSON.stringify(container.textContent)
        // Restore the caret position
        setCaretPosition(container, caretOffset);
    };

    const setCaretPosition = (element, offset) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let currentNode = walker.nextNode();
        let currentOffset = 0;

        while (currentNode) {
            const nodeLength = currentNode.nodeValue.length;

            if (currentOffset + nodeLength >= offset) {
                const range = document.createRange();
                range.setStart(currentNode, offset - currentOffset);
                range.collapse(true);

                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                break;
            }

            currentOffset += nodeLength;
            currentNode = walker.nextNode();
        }
    };

    const getCaretCharacterOffsetWithin = (element) => {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    const formatText = (content) => {
        if (!content) return '';

        // Replace {{...}} with spans
        const formattedContent = content.replace(/\{\{(.*?)\}\}/g, (match, p1) => {
            return `<span class="coloredText">{{${p1}}}</span>`;
        });

        // Replace [[...]] with spans
        const finalFormattedContent = formattedContent.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
            return `<span class="coloredText">[[${p1}]]</span>`;
        });

        console.log(finalFormattedContent)


        return finalFormattedContent;
    };

    return (
        <textarea name="email_formatter" defaultValue={emailBody} id="email_formatter" cols="30" rows="11"></textarea>
        );
    }
    
    export default EmailFormatter;
    
    {/* <div
        ref={emailFormatterRef}
        id='email_formatter'
        className='editable-container'
        onInput={handleInput}
        contentEditable='true'
    ></div> */}