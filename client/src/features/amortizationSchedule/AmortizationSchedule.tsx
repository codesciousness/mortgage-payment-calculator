import React from 'react';
import AmortizationTable from '../amortizationTable/AmortizationTable';

type AmortizationScheduleProps = {
    
};

const AmortizationSchedule = ({  }: AmortizationScheduleProps): JSX.Element => {

    return (
        <section id='AmortizationSchedule'>
            <h2>Amortization for mortgage loan</h2>
            <AmortizationTable />
        </section>
    );
};

export default AmortizationSchedule;