import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() => getAppointmentCount(result.current.appointments) > 0);

  const filteredAppointmentsLength = getAppointmentCount(
    result.current.appointments,
  );

  act(() => result.current.setShowAll(true));

  await waitFor(
    () =>
      getAppointmentCount(result.current.appointments) >
      filteredAppointmentsLength,
  );
});
