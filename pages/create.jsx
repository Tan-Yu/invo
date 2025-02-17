import { useState, useEffect, Fragment } from "react";
import Head from "next/head";

import {
  Container,
  TextInput,
  Button,
  SimpleGrid,
  Title,
  Text,
  Divider,
  Box,
  NumberInput,
} from "@mantine/core";

import { useForm, formList } from "@mantine/form";

import { DatePicker } from "@mantine/dates";
import PDF from "../components/PDF";

const Create = () => {
  const [pdfData, setPdfData] = useState({
    invoiceName: "",
    img: "",
    date: new Date(),
    place: "",
    fromName: "",
    fromFirm: "",
    fromStreet: "",
    fromCity: "",
    fromPIB: "",
    fromAccount: "",
    toEmail: "",
    toName: "",
    toAddress: "",
    toCity: "",
    toPIB: "",
    toAccount: "",
    invoiceData: [],
  });

  const form = useForm({
    initialValues: {
      invoiceName: "",
      img: "",
      date: new Date(),
      place: "",
      fromName: "",
      fromFirm: "",
      fromStreet: "",
      fromCity: "",
      fromPIB: "",
      fromAccount: "",
      toEmail: "",
      toName: "",
      toAddress: "",
      toCity: "",
      toPIB: "",
      toAccount: "",
      invoiceData: formList([]),
    },
  });

  const handleFormSubmit = (values) => {
    setPdfData(values);
  };

  useEffect(() => {
    form.addListItem("invoiceData", {
      serviceType: "",
      unit: 0,
      amount: 0,
      price: 0,
      total: 0,
    });
  }, []);

  return (
    <Container size="md">
      <Head>
        <title>Create Invoice</title>
        <meta name="description" content="Fill out the fields and create your invoice." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text color="blue" size="xl" weight={700} style={{ fontSize: 48 }}>
        Crete your invoice here
      </Text>
      <Text color="gray">
        Just fill out these fields and the{" "}
        <Text component="span" inherit color="blue">
          invoice will be created below
        </Text>
        . You can leave any field empty except Invoice Name and it will work. You can
        create whatever you want.
      </Text>

      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <Box my={12}>
          <Title order={2}>Who is sending the invoice.</Title>
          <Divider />
        </Box>

        <TextInput
          label="Customer Name"
          placeholder="Invo"
          {...form.getInputProps("invoiceName")}
        />

        <SimpleGrid
          cols={2}
          my={12}
          spacing="lg"
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: "md" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <DatePicker label="Invoice Date" {...form.getInputProps("date")} />

          {/* <TextInput
            label="Place"
            placeholder="Miami Florida"
            {...form.getInputProps("place")}
          /> */}

          <TextInput
            label="From"
            placeholder="Jack"
            {...form.getInputProps("fromName")}
          />
{/* 
          <TextInput
            label="Firm"
            placeholder="Firm"
            {...form.getInputProps("fromFirm")}
          />

          <TextInput
            label="Street"
            placeholder="NW St 20th"
            {...form.getInputProps("fromStreet")}
          />

          <TextInput
            label="City"
            placeholder="Miami"
            {...form.getInputProps("fromCity")}
          />

          <TextInput
            label="PIB"
            placeholder="69969888684"
            {...form.getInputProps("fromPIB")}
          />

          <TextInput
            label="Account"
            placeholder="88188752422"
            {...form.getInputProps("fromAccount")}
          /> */}
        </SimpleGrid>

        <Box my={12}>
          <Title order={2}>Who the invoice is for.</Title>
          <Divider />
        </Box>

        <SimpleGrid
          cols={2}
          my={12}
          spacing="lg"
          breakpoints={[
            { maxWidth: 755, cols: 2, spacing: "md" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          <TextInput
            label="Email"
            placeholder="invo@me"
            {...form.getInputProps("toEmail")}
          />

          <TextInput label="Name" placeholder="John" {...form.getInputProps("toName")} />

          <TextInput
            label="Address"
            placeholder="NW 77th Avenue"
            {...form.getInputProps("toAddress")}
          />

          <TextInput label="City" placeholder="Miami" {...form.getInputProps("toCity")} />

          <TextInput
            label="Phone"
            placeholder="81234567"
            {...form.getInputProps("toPhone")}
          />

          <TextInput
            label="Account"
            placeholder="487778112354"
            {...form.getInputProps("toAccount")}
          />
        </SimpleGrid>

        <Divider my={12} />

        <SimpleGrid
          cols={5}
          my={12}
          spacing="lg"
          breakpoints={[
            { maxWidth: 755, cols: 5, spacing: "md" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {form.values.invoiceData.map((_, index) => {
            return (
              <Fragment key={index}>
                <TextInput
                  label="Service Type"
                  placeholder="Potato Sale"
                  {...form.getListInputProps("invoiceData", index, "serviceType")}
                />

                <NumberInput
                  label="Unit"
                  placeholder="1 ton"
                  {...form.getListInputProps("invoiceData", index, "unit")}
                />

                <NumberInput
                  label="Amount"
                  placeholder="12"
                  {...form.getListInputProps("invoiceData", index, "amount")}
                />

                <NumberInput
                  label="Price"
                  placeholder="500"
                  {...form.getListInputProps("invoiceData", index, "price")}
                />

                <NumberInput
                  label="Total"
                  placeholder="6000"
                  {...form.getListInputProps("invoiceData", index, "total")}
                />
              </Fragment>
            );
          })}
        </SimpleGrid>
        <Button
        fullWidth
        variant="light"
        onClick={() => {
          const listLength = form.values.invoiceData.length;
          if (listLength > 1) {
            form.removeListItem("invoiceData", listLength - 1);
          }
        }}
        disabled={form.values.invoiceData.length <= 1}

      >
        Delete
      </Button>
        <Button
          fullWidth
          variant="light"
          onClick={() => {
            form.addListItem("invoiceData", {
              serviceType: "",
              unit: 0,
              amount: 0,
              price: 0,
              total: 0,
            });
          }}
        >
          Add
        </Button>

        <Button type="submit" size="lg" my={18}>
          Create
        </Button>
      </form>

      {pdfData.invoiceName && <PDF invoice={pdfData} />}
    </Container>
  );
};

export default Create;
