
import * as React from 'react';

import { Form, FormElement, Field } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from './../components/form/Input';
import { MaskedTextBox } from './../components/form/MaskedTextBox';
import { DropDownList } from './../components/form/DropDownList';
import { Editor } from './../components/form/Editor';
import { Upload } from './../components/form/Upload';
import { countries } from './../resources/countries';

import { requiredValidator, emailValidator, phoneValidator, biographyValidator } from './../validators'

const Profile = () => {
        const handleSubmit = (dataItem) => {
            alert(JSON.stringify(dataItem, null, 2));
        };
        return (
            <div id="Profile" className="profile-page main-content">
                <div className="card-container">
                    <div className="card-component">
                        <Form
                            onSubmit={handleSubmit}
                            render={(formRenderProps) => (
                                <FormElement horizontal={true} style={{ maxWidth: 650 }}>
                                    <Field
                                        id={'avatar'}
                                        name={'avatar'}
                                        label={''}
                                        validator={requiredValidator}
                                        component={Upload}
                                    />
                                    <Field
                                        id={'firstname'}
                                        name={'firstname'}
                                        label={'First Name'}
                                        validator={requiredValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'middlename'}
                                        name={'middlename'}
                                        label={'Middle Name'}
                                        optional={true}
                                        component={Input}
                                    />
                                    <Field
                                        id={'lastname'}
                                        name={'lastname'}
                                        label={'Last Name'}
                                        validator={requiredValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'email'}
                                        name={'email'}
                                        type={'email'}
                                        placeholder={'e.g.: peter@gmail.com'}
                                        label={'Email Address'}
                                        validator={emailValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'phonenumber'}
                                        name={'phonenumber'}
                                        label={'Phone Number'}
                                        mask={'(+9) 0000-000-00-00'}
                                        validator={phoneValidator}
                                        component={MaskedTextBox}
                                    />
                                    <Field
                                        id={'country'}
                                        name={'country'}
                                        label={'Country'}
                                        data={countries}
                                        textField={'name'}
                                        valueField={'code'}
                                        component={DropDownList}
                                    />
                                    <Field
                                        id={'biography'}
                                        name={'biography'}
                                        label={'Biography'}
                                        validator={biographyValidator}
                                        component={Editor}
                                    />
                                    <div className={'k-form-buttons'}>
                                        <Button>
                                                Cancel
                                        </Button>
                                        <Button
                                            primary={true}
                                            type={'submit'}
                                            disabled={!formRenderProps.allowSubmit}
                                        >
                                                Save Changes
                                        </Button>
                                    </div>
                                </FormElement>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
}

export default Profile;
