// Using Ajax
// This function is getting the zip code from the input fields and calculating the latitude and longitud.

$(function() {
	delete button;
	$("#delete").click(function(e) {
		// selecting the restaurant's id from hidden input
		e.preventDefault();
		const id = $("#res_id").val();
		console.log(id);
		console.log(`Deleting id: ${id}`);
		// Prompt user before deleting
		const confirm = window.confirm("Are you sure you want to delete this?");
		if (confirm) {
			// execute if user selects okay
			$.ajax({
				url: `/dinelist/${id}`, // Path
				type: "DELETE",

				success: function(data) {
					console.log("deleting ", data);
					// redirect to restaurants list after deleting an individual restaurant
					window.location.href = "/dinelist";
				},
				error: function(xhr, status, error) {
					// add error handler
				}
			});
		}
	});
}); // ends doc.ready
