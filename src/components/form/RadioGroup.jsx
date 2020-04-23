import React from 'react';
import * as PropTypes from 'prop-types';

import { RadioGroup as KendoRadioGroup } from '@progress/kendo-react-inputs';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const RadioGroup = (fieldRenderProps) => {
    const { validationMessage, visited, label, labelId, valid, hint, optional, ...others } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    const radioRef = React.useRef(null);

    return (
        <FieldWrapper>
            <Label id={labelId} editorRef={radioRef} editorValid={valid} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoRadioGroup
                    ariaDescribedBy={labelId}
                    ariaLabelledBy={labelId}
                    valid={valid}
                    ref={radioRef}
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

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = {
    valid: PropTypes.bool,
    value: PropTypes.string,
    labelId: PropTypes.string,
    data: PropTypes.array,
    optional: PropTypes.bool,
    label: PropTypes.string,
    hint: PropTypes.string,
    validationMessage: PropTypes.string,
    visited: PropTypes.bool,
};