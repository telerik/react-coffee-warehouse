import React from 'react';

import { Upload as KendoUpload } from '@progress/kendo-react-upload';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Avatar } from '@progress/kendo-react-layout';

export const Upload = (fieldRenderProps) => {
    const {valid, value, id, optional, label, hint, validationMessage, visited, ...others} = fieldRenderProps;
    const imgRef = React.useRef(null);
    const hasImage = value && value.length > 0;
    const showValidationMessage = visited && validationMessage;

    const onChangeHandler = (event) => {
        fieldRenderProps.onChange({ value: event.newState });
    };
    const onRemoveHandler = (event) => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    React.useEffect(
        () => {
            if (hasImage) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    imgRef.current.setAttribute('src', e.target.result)
                }

                reader.readAsDataURL(value[0].getRawFile());
            }
        },
        [value, hasImage]
    );

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>
                {label}
                <Avatar style={{width: 100, height: 100}} shape={'circle'} type={hasImage ? 'image' : 'initials'}>
                    {
                        hasImage ?
                            <img style={{width: 100, height: 100}} ref={imgRef} src={'#'} alt={'User Avatar'} /> :
                            'AVATAR'
                    }
                </Avatar>
            </Label>
            <div className={'k-form-field-wrap'}>
                <KendoUpload
                    id={id}
                    valid={valid}
                    autoUpload={false}
                    showActionButtons={false}
                    multiple={false}
                    files={value}
                    onAdd={onChangeHandler}
                    onRemove={onRemoveHandler}
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