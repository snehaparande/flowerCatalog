const createTag = (tag, content) => {
  return `<${tag}>${content}</${tag}>`;
};

const createHeadRow = (headers) => {
  const cells = headers.map((header) => {
    return createTag('th', header);
  });
  return createTag('tr', cells.join(''));
};

const createRow = (row) => {
  const cells = row.map((cell) => {
    return createTag('td', cell);
  });
  return createTag('tr', cells.join(''));
};

const createTable = (headers, rows) => {
  const tableRows = [];
  tableRows.push(createHeadRow(headers));

  rows.forEach((row) => {
    tableRows.push(createRow(Object.values(row)));
  });

  const table = createTag('table', tableRows.join(''));
  return table;
};

const toHtml = (bodyContent) => {
  const body = createTag('body', bodyContent);
  const head = createTag('head', '');
  return createTag('html', head + body);
};

module.exports = { createTable, toHtml };
