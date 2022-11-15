const FirstNameProps = {
    fieldId: "FirstName",
    errorMsg: "Sorry, only letters (a-z,A-Z) are allowed.",
    format: /^[A-Za-z\s]*$/
} 
const LastNameProps = {
    fieldId: "LastName",
    errorMsg: "Sorry, only letters (a-z,A-Z) are allowed.",
    format: /^[A-Za-z\s]*$/
} 
const PhoneNumberProps = {
    fieldId: "PhoneNumber",
    errorMsg: "Sorry, only numbers (0-9) are allowed and start with sign (+) with country code.",
    format: /^[+]{1}[0-9]*$/
}
const EmailAddressProps = {
    fieldId: "EmailAddress",
    errorMsg: "Sorry, only letters (a-z), numbers (0-9), and signs (.-_@) are allowed.",
    format: /^[A-Za-z0-9.\-_@]*$/,
}
const FavoritePokemonProps = {
    fieldId: "FavoritePokemon",
    errorMsg: "Sorry, this field is required.",
    format: /^[A-Za-z0-9\s]*$/
}

export const contentData = {
    FirstName: FirstNameProps,
    LastName: LastNameProps,
    PhoneNumber: PhoneNumberProps,
    EmailAddress: EmailAddressProps,
    FavoritePokemon: FavoritePokemonProps,
}