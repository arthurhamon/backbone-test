<!--TODO-->
<td><%= firstName %></td>
<td><%= lastName %></td>
<td><%= phoneNumber %></td>
<td>
	<a href="#modifModal" class="btn btn-info js-edit" data-id="<%= id %>" role="button" data-toggle="modal"><i class="icon-edit icon-white"></i> Modifier</a>
	<button class="btn btn-danger js-delete" style="margin-left:10px;" data-id="<%= id %>"><i class="icon-remove icon-white"></i> Supprimer</button>
</td>