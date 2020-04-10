import React from 'react';

import { Editor as KendoEditor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Schema } from '@progress/kendo-react-editor/prosemirror/model';

const EDITOR_HTML_NULL_VALUE = '<p></p>';

export const Editor = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, hint, optional, value, onChange, ...others } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    const editorRef = React.useRef(null);

    const editorValueRef = React.useRef(
        EditorUtils.createDocument(new Schema({ nodes:EditorUtils.nodes, marks:EditorUtils.marks }), value)
    );

    const onChangeHandler = (event) => {
        const htmlValue = EditorUtils.getHtml({ doc: event.value, schema: event.schema });

        editorValueRef.current = event.value;

        onChange({value: htmlValue});
    };

    if (editorRef.current && editorValueRef.current) {
        const schema = editorRef.current.view.state.schema;
        const currentHtml = EditorUtils.getHtml({ doc: editorValueRef.current, schema: schema});

        if (currentHtml !== (value || EDITOR_HTML_NULL_VALUE)) {
            // updating value outside
            editorValueRef.current = EditorUtils.createDocument(schema, value);
        }
    }

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoEditor
                    id={id}
                    valid={valid}
                    ref={editorRef}
                    defaultEditMode={'div'}
                    contentStyle={{ height: 290 }}
                    // defaultContent={value}
                    value={editorValueRef.current}
                    onChange={onChangeHandler}
                    tools={[
                        [ EditorTools.Bold, EditorTools.Italic, EditorTools.Underline ],
                        [ EditorTools.AlignLeft, EditorTools.AlignCenter, EditorTools.AlignRight ],
                        [ EditorTools.OrderedList, EditorTools.UnorderedList, EditorTools.Indent, EditorTools.Outdent ]
                    ]}
                    {...others}
                />
                {
                    !showValidationMessage &&
                        <Hint>{hint}</Hint>
                }
                {
                    showValidationMessage &&
                        <Error>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};
