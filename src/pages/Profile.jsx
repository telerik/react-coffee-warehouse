
import * as React from 'react';

import { useHistory } from "react-router-dom";

import { Form, FormElement, Field } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from './../components/form/Input';
import { MaskedTextBox } from './../components/form/MaskedTextBox';
import { DropDownList } from './../components/form/DropDownList';
import { Editor } from './../components/form/Editor';
import { Upload } from './../components/form/Upload';
import { countries } from './../resources/countries';
import { AppContext } from './../AppContext'

import { requiredValidator, emailValidator, phoneValidator, biographyValidator } from './../validators'

const countriesData = countries.map(country => country.name);

const Profile = () => {
        const {languageId, onLanguageChange, onProfileChange, ...formValues} = React.useContext(AppContext);
        let history = useHistory();

        const handleSubmit = React.useCallback(
            (dataItem) => {
                onProfileChange({dataItem});

                history.push('/');
            },
            [onProfileChange, history]
        );

        return (
            <div id="Profile" className="profile-page main-content">
                <div className="card-container">
                    <div className="card-component">
                        <Form
                            onSubmit={handleSubmit}
                            initialValues={{
                                ...formValues
                            }}
                            render={(formRenderProps) => (
                                <FormElement horizontal={true} style={{ maxWidth: 700 }}>
                                    <Field
                                        id={'avatar'}
                                        name={'avatar'}
                                        label={''}
                                        validator={requiredValidator}
                                        component={Upload}
                                    />
                                    <Field
                                        id={'firstName'}
                                        name={'firstName'}
                                        label={'First Name'}
                                        validator={requiredValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'middleName'}
                                        name={'middleName'}
                                        label={'Middle Name'}
                                        optional={true}
                                        component={Input}
                                    />
                                    <Field
                                        id={'lastName'}
                                        name={'lastName'}
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
                                        id={'phoneNumber'}
                                        name={'phoneNumber'}
                                        label={'Phone Number'}
                                        mask={'(+9) 0000-000-00-00'}
                                        validator={phoneValidator}
                                        component={MaskedTextBox}
                                    />
                                    <Field
                                        id={'country'}
                                        name={'country'}
                                        label={'Country'}
                                        data={countriesData}
                                        component={DropDownList}
                                    />
                                    <Field
                                        id={'biography'}
                                        name={'biography'}
                                        label={'Short Biography'}
                                        validator={biographyValidator}
                                        component={Editor}
                                    />
                                    <hr />
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
