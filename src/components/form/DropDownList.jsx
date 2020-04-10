import React from 'react';

import { DropDownList as KendoDropDownList } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const DropDownList = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, hint, optional, ...others } = fieldRenderProps;
    const ddlRef = React.useRef(null);
    const showValidationMessage = visited && validationMessage;
    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorRef={ddlRef} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoDropDownList ref={ddlRef} valid={valid} id={id} {...others} />
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