
import * as React from 'react';

import { useLocalization } from '@progress/kendo-react-intl';

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
        const localizationService = useLocalization();
        const history = useHistory();

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
                                        label={localizationService.toLanguageString('custom.firstName')}
                                        validator={requiredValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'middleName'}
                                        name={'middleName'}
                                        label={localizationService.toLanguageString('custom.middleName')}
                                        optional={true}
                                        component={Input}
                                    />
                                    <Field
                                        id={'lastName'}
                                        name={'lastName'}
                                        label={localizationService.toLanguageString('custom.lastName')}
                                        validator={requiredValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'email'}
                                        name={'email'}
                                        type={'email'}
                                        placeholder={'e.g.: peter@gmail.com'}
                                        label={localizationService.toLanguageString('custom.email')}
                                        validator={emailValidator}
                                        component={Input}
                                    />
                                    <Field
                                        id={'phoneNumber'}
                                        name={'phoneNumber'}
                                        label={localizationService.toLanguageString('custom.phoneNumber')}
                                        mask={'(+9) 0000-000-00-00'}
                                        validator={phoneValidator}
                                        component={MaskedTextBox}
                                    />
                                    <Field
                                        id={'country'}
                                        name={'country'}
                                        label={localizationService.toLanguageString('custom.country')}
                                        data={countriesData}
                                        component={DropDownList}
                                    />
                                    <Field
                                        id={'biography'}
                                        name={'biography'}
                                        label={localizationService.toLanguageString('custom.biography')}
                                        validator={biographyValidator}
                                        component={Editor}
                                    />
                                    <hr />
                                    <div className={'k-form-buttons'}>
                                        <Button>
                                            {localizationService.toLanguageString('custom.cancel')}
                                        </Button>
                                        <Button
                                            primary={true}
                                            type={'submit'}
                                            disabled={!formRenderProps.allowSubmit}
                                        >
                                            {localizationService.toLanguageString('custom.saveChanges')}
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
