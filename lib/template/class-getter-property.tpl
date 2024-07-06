    get {{propertyName}}() {
        return super.get({ {{propertyName}}: {{propertyType}}.prototype });
    }