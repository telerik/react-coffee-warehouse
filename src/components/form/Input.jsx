import React from 'react';
import * as PropTypes from 'prop-types';

import { Input as KendoInput } from '@progress/kendo-react-inputs';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const Input = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, valid, hint, optional, ...others } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoInput valid={valid} id={id} {...others} />
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

Input.displayName = 'Input';
Input.propTypes = {
    valid: PropTypes.bool,
    value: PropTypes.string,
    id: PropTypes.string,
    optional: PropTypes.bool,
    label: PropTypes.string,
    hint: PropTypes.string,
    validationMessage: PropTypes.string,
    visited: PropTypes.bool,
};