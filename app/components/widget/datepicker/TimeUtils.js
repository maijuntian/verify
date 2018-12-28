function getDaysInOneMonth(year, month) {
    const d = new Date(year, month, 0);
    return d.getDate();
}

export default module.export = {
    getDaysInOneMonth
}