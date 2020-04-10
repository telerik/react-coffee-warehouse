import React from 'react';

import { MaskedTextBox as KendoMaskedTextBox } from '@progress/kendo-react-inputs';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const MaskedTextBox = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, hint, optional, ...others } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoMaskedTextBox valid={valid} id={id} {...others} />
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