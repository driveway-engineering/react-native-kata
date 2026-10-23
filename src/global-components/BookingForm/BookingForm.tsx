import { bookingPageCopy } from "@copy/bookingPage";
import Button from "@core-components/Button";
import TextField from "@core-components/TextField";
import Typography from "@core-components/Typography";
import { useBookingForm } from "@hooks/useBookingForm";
import type { BookingRequest } from "@utils/types";
import { useRef } from "react";
import { Keyboard, View, type TextInput } from "react-native";
import { styles } from "./BookingForm.styles";

export type BookingFormProps = {
  onSubmit: (booking: BookingRequest) => void;
  isSubmitting?: boolean;
};

const { labels, placeholders } = bookingPageCopy;

const BookingForm = ({ onSubmit, isSubmitting = false }: BookingFormProps) => {
  const { values, errors, setValue, submit } = useBookingForm();
  const emailRef = useRef<TextInput>(null);
  const modelYearRef = useRef<TextInput>(null);
  const makeRef = useRef<TextInput>(null);
  const modelRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    const booking = submit();
    if (booking) {
      Keyboard.dismiss();
      onSubmit(booking);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.section}>
        <Typography accessibilityRole="header" variant="title">
          {bookingPageCopy.yourDetails}
        </Typography>
        <TextField
          autoCapitalize="words"
          autoComplete="name"
          editable={!isSubmitting}
          error={errors.customerName}
          label={labels.customerName}
          onChangeText={(text) => setValue("customerName", text)}
          onSubmitEditing={() => emailRef.current?.focus()}
          placeholder={placeholders.customerName}
          returnKeyType="next"
          submitBehavior="submit"
          testID="input-customer-name"
          textContentType="name"
          value={values.customerName}
        />
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          editable={!isSubmitting}
          error={errors.email}
          keyboardType="email-address"
          label={labels.email}
          onChangeText={(text) => setValue("email", text)}
          onSubmitEditing={() => modelYearRef.current?.focus()}
          placeholder={placeholders.email}
          ref={emailRef}
          returnKeyType="next"
          submitBehavior="submit"
          testID="input-email"
          textContentType="emailAddress"
          value={values.email}
        />
      </View>

      <View style={styles.section}>
        <Typography accessibilityRole="header" variant="title">
          {bookingPageCopy.vehicle}
        </Typography>
        <TextField
          editable={!isSubmitting}
          error={errors.modelYear}
          keyboardType="number-pad"
          label={labels.modelYear}
          maxLength={4}
          onChangeText={(text) => setValue("modelYear", text.replace(/\D/g, ""))}
          onSubmitEditing={() => makeRef.current?.focus()}
          placeholder={placeholders.modelYear}
          ref={modelYearRef}
          returnKeyType="next"
          submitBehavior="submit"
          testID="input-model-year"
          value={values.modelYear}
        />
        <TextField
          autoCapitalize="words"
          editable={!isSubmitting}
          error={errors.make}
          label={labels.make}
          onChangeText={(text) => setValue("make", text)}
          onSubmitEditing={() => modelRef.current?.focus()}
          placeholder={placeholders.make}
          ref={makeRef}
          returnKeyType="next"
          submitBehavior="submit"
          testID="input-make"
          value={values.make}
        />
        <TextField
          autoCapitalize="words"
          editable={!isSubmitting}
          error={errors.model}
          label={labels.model}
          onChangeText={(text) => setValue("model", text)}
          onSubmitEditing={handleSubmit}
          placeholder={placeholders.model}
          ref={modelRef}
          returnKeyType="done"
          testID="input-model"
          value={values.model}
        />
      </View>

      <Button
        loading={isSubmitting}
        onPress={handleSubmit}
        style={styles.submit}
        testID="submit-booking-button"
      >
        {bookingPageCopy.submit}
      </Button>
    </View>
  );
}

export default BookingForm;
