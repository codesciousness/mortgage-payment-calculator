import React from 'react';
import NumberInput from '../numberInput/NumberInput';
import Label from '../label/Label';

/**
 * Added additonal divs around NumberInput because width: 100%
 * seems to be ignored by the browser when TextField is a direct child
 * of a flex parent element.
 */

type DualInputProps = {
    name: string;
    dollar: string;
    percent: string;
    width: number | string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DualInput = ({ name, dollar, percent, width, onChange }: DualInputProps): JSX.Element => {

    const getDollarWidth = (width: number | string) => {
        if (typeof width === 'number') {
            return width * (2/3);
        }
        if (typeof width === 'string') {
            return width;
        }
    }

    const getPercentWidth = (width: number | string) => {
        if (typeof width === 'number') {
            return width * (1/3);
        }
        if (typeof width === 'string') {
            return width;
        }
    }

    return (
        <div className='DualInput' style={{ width, marginBottom: '0.75rem' }}>
            <Label name={name}/>
            <div className='DualInput__container' style={{ display: 'flex' }}>
                <div style={{ flex: 2 }}>
                    <NumberInput name={`${name} Dollar`} value={dollar} sign='dollar' width={getDollarWidth(width)} dual onChange={onChange}/>
                </div>
                <div style={{ flex: 1 }}>
                    <NumberInput name={`${name} Percent`} value={percent} sign='percent' width={getPercentWidth(width)} dual onChange={onChange}/>
                </div>
            </div>
        </div>
    );
};

export default DualInput;