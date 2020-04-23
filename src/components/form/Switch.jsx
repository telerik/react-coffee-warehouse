import React from 'react';
import * as PropTypes from 'prop-types';

import { Switch as KendoSwitch } from '@progress/kendo-react-inputs';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const Switch = (fieldRenderProps) => {
    const { validationMessage, visited, label, labelId, id, valid, hint, optional, value, ...others } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    const switchRef = React.useRef(null);

    return (
        <FieldWrapper>
            <Label id={labelId} editorRef={switchRef} editorValid={valid} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoSwitch
                    ariaDescribedBy={labelId}
                    ariaLabelledBy={labelId}
                    valid={valid}
                    checked={value}
                    ref={switchRef}
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

Switch.displayName = 'Switch';
Switch.propTypes = {
    valid: PropTypes.bool,
    value: PropTypes.bool,
    id: PropTypes.string,
    labelId: PropTypes.string,
    optional: PropTypes.bool,
    label: PropTypes.string,
    hint: PropTypes.string,
    validationMessage: PropTypes.string,
    visited: PropTypes.bool,
};