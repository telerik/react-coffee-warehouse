import React from 'react';
import * as PropTypes from 'prop-types';

import { DropDownList as KendoDropDownList } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const DropDownList = (fieldRenderProps) => {
    const { validationMessage, visited, label, id, defaultValue, valid, hint, optional, ...others } = fieldRenderProps;
    const ddlRef = React.useRef(null);
    const showValidationMessage = visited && validationMessage;
    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorRef={ddlRef} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <KendoDropDownList ref={ddlRef} defaultValue={defaultValue} valid={valid} id={id} {...others} />
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

DropDownList.displayName = 'DropDownList';
DropDownList.propTypes = {
    valid: PropTypes.bool,
    defaultValue: PropTypes.object,
    id: PropTypes.string,
    optional: PropTypes.bool,
    label: PropTypes.string,
    hint: PropTypes.string,
    validationMessage: PropTypes.string,
    visited: PropTypes.bool,
};